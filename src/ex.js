import CustomMetaTags from "@components/Common/CustomMetaTags";
import React, { useEffect, useState, useContext, useRef } from "react";
import { UserContext } from "@contexts/UserContext";
import SocketConnection from "./SocketConnection";
import { CustomAlertContext } from "@contexts/CustomAlertContext";
import { errorHandler, get, post } from "helpers/api_helper";
import { ChatRoomsList, Messages, SendMessage } from "./Chats";
import SpinnerLoader from "@components/Loader/SpinnerLoader";
import Breadcrumb from "@components/Common/Breadcrumb";
const MessengersList = () => {
  const [roomsList, setRoomsList] = useState([]);
  const roomsListRef = useRef();
  const roomsIdsRef = useRef();
  const [activeRoom, setActiveRoom] = useState({});
  const activeRoomRef = useRef();
  const [activeRoomMessages, setActiveRoomMessages] = useState([]);
  const [messagesListLoader, setMessagesListLoader] = useState(false);
  const [chatRoomsListLoader, setChatRoomsListLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const activeRoomMessagesRef = useRef();
  const { user } = useContext(UserContext);
  const customAlert = useContext(CustomAlertContext);
  useEffect(() => {
    getAllChatRoomsByUserId();
  }, []);
  useEffect(() => {
    if (activeRoom.id) {
      setMessagesListLoader(true);
      getChatRoomMessagesByRoomId(activeRoom.id);
    }
  }, [activeRoom]);
  const sendMessage = (to_send, message) => {
    let data = new FormData();
    data.append("to_send", to_send);
    data.append("message", message);
    data.append("is_file", message.name ? true : false);
    return post("chats/send_message", data)
      .then((res) => {
        if (res?.result?.chat_id) {
          getChatRoomMessagesByRoomId(res.result.chat_id);
        }
        return res;
      })
      .catch((err) => {
        let msg = errorHandler(err);
        customAlert.error(msg);
        return null;
      });
  };
  const getChatRoomMessagesByRoomId = (roomId) => {
    return get("chats/" + roomId + "?page_no=1&page_size=1000")
      .then((res) => {
        if (res?.result?.data) {
          handleUpdateActiveRoomMessages(res.result.data.reverse());
        }
        setMessagesListLoader(false);
        return true;
      })
      .catch((err) => {
        let msg = errorHandler(err);
        customAlert.error(msg);
        return null;
      });
  };
  const getChatRoomInfoByRoomId = (roomId) => {
    return get("chats/info/" + roomId)
      .then((res) => {
        return res.result;
      })
      .catch((err) => {
        let msg = errorHandler(err);
        customAlert.error(msg);
      });
  };
  const getAllChatRoomsByUserId = (userId = user.id) => {
    setChatRoomsListLoader(true);
    get("chats?page_no=1&limit=1000&user_id=" + userId)
      .then((res) => {
        if (res?.result?.data) {
          handleUpdateRoomsList(res.result.data);
        }
      })
      .catch((err) => {
        let msg = errorHandler(err);
        customAlert.error(msg);
      })
      .finally(() => {
        setChatRoomsListLoader(false);
      });
  };
  const handleUpdateRoomIds = (ids) => {
    roomsIdsRef.current = ids;
  };
  const handleUpdateRoomsList = (list, updateRoomIdsString = true) => {
    setRoomsList(list);
    roomsListRef.current = list;
    if (updateRoomIdsString) {
      let ids = [];
      list.map((item) => {
        ids.push(item.id);
      });
      handleUpdateRoomIds(ids);
    }
    setRefresh((prevState) => !prevState);
  };
  const handleUpdateActiveRoom = (room) => {
    setActiveRoom(room);
    activeRoomRef.current = room;
    if (room.new_msg) {
      let rooms = roomsListRef.current;
      rooms[roomsIdsRef.current.indexOf(room.id)].new_msg = false;
      handleUpdateRoomsList(rooms, false);
    }
  };
  const handleUpdateActiveRoomMessages = (list) => {
    setActiveRoomMessages(list);
    activeRoomMessagesRef.current = list;
  };
  const handleReceivedMessage = (event) => {
    console.log("Received message", event);
    let { data } = typeof event === "string" ? JSON.parse(event) : event;
    if (data?.chat?.members && data.chat.members.includes(user.id)) {
      let { chat, message } = data;
      if (roomsIdsRef.current.includes(chat.id)) {
        if (activeRoomRef.current && activeRoomRef.current.id == chat.id) {
          handleUpdateActiveRoomMessages(activeRoomMessagesRef.current.concat([message]));
        } else {
          markNewMessageToRoom(chat.id);
        }
      } else {
        addNewRoomToList(chat);
      }
    } else {
      console.log("Discard Message");
    }
  };
  const markNewMessageToRoom = (room_id) => {
    let rooms = roomsListRef.current;
    rooms[roomsIdsRef.current.indexOf(room_id)].new_msg = true;
    handleUpdateRoomsList(rooms, false);
  };
  const addNewRoomToList = async (room) => {
    console.log("addNewRoomToList", room);
    let newRoom = await getChatRoomInfoByRoomId(room.id);
    console.log("newRoom", newRoom);
    let rooms = roomsListRef.current;
    handleUpdateRoomsList([newRoom].concat(rooms));
    console.log("room", rooms);
  };
  const handleMessageSend = (msg, successCallback, errorCallback) => {
    let id;
    activeRoom.member_users.map((member) => {
      if (member.id !== user.id) {
        id = member.id;
      }
    });
    if (id)
      sendMessage(id, msg)
        .then(() => {
          successCallback();
        })
        .catch(() => {
          errorCallback();
        });
  };
  const rooms = roomsList.length ? (
    <div className="col-12 d-flex p-3" key={roomsList.length}>
      <ChatRoomsList items={roomsList} handleUpdateActiveRoom={handleUpdateActiveRoom} activeRoom={activeRoom} />
      <div className="col-12 col-lg-9 d-flex flex-column ">
        <Messages items={activeRoomMessages || []} loader={messagesListLoader} />
        {typeof activeRoom.id == "string" ? <SendMessage handleMessageSend={handleMessageSend} /> : null}
      </div>
    </div>
  ) : (
    <p className="m-3">No Chats Available</p>
  );
  return (
    <>
      <div className="page-content">
        <Breadcrumb breadcrumbItem={"Messenger"} />
        <SocketConnection handleReceivedMessage={handleReceivedMessage} />
        <div key={refresh}>
          <CustomMetaTags title="Messenger" />
          {chatRoomsListLoader ? <SpinnerLoader /> : rooms}
        </div>
      </div>
    </>
  );
};
export default MessengersList;