import React, { useState, useEffect, useRef } from "react";
import SocketConnection from "./SocketConnection";
import {
  Container,
  HistoryBoxContainer,
  UserBox,
  LogoBtn,
  NameDiv,
  RoomBox,
  SendMsg,
  Input,
  InputDiv,
  SendBtn,
  GetMsg,
  HistoryBox,
} from "./style";

const ChatUi = () => {
  const [data, setData] = useState([]);
  const [mas, setMas] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  // const [activeRoomMessages, setActiveRoomMessages] = useState([]);
  // const activeRoomMessagesRef = useRef();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkMjA5ZTNkZTJlYTM0ZjU2YjY2YWJmIiwiaWF0IjoxNjc0NzExODE0LCJleHAiOjE2NzczMDM4MTR9.g5Jj_eJqhqGZxg-Mx4nx4Dzbqyt_9EyEtIFoGnpWe4E";
  const fetchData = () => {
    fetch(
      "http://172.105.41.247:5004/api/v1/chats?page_no=1&limit=10&user_id=63d209e3de2ea34f56b66abf",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setData(result.result.data);
        console.log(result.result.data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchHistory = (id) => {
    // setUserId(id);
    // console.log(id, "kidddddddddd");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkMjA5ZTNkZTJlYTM0ZjU2YjY2YWJmIiwiaWF0IjoxNjc0NzExODE0LCJleHAiOjE2NzczMDM4MTR9.g5Jj_eJqhqGZxg-Mx4nx4Dzbqyt_9EyEtIFoGnpWe4E";
    fetch(
      `http://172.105.41.247:5004/api/v1/chats/${id}?page_no=1&page_size=10`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setMas(result.result.data.reverse());

        // console.log(result.result.data, "text messages_____--------__----");
      });
  };

  const pushMsg = () => {
    // console.log(userId, "iddddddddd");
    let data = new FormData();
    data.append("to_send", userId);
    data.append("message", message);
    data.append("is_file", false);
    // data.append("send_to_role", "vendor");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkMjA5ZTNkZTJlYTM0ZjU2YjY2YWJmIiwiaWF0IjoxNjc0NzExODE0LCJleHAiOjE2NzczMDM4MTR9.g5Jj_eJqhqGZxg-Mx4nx4Dzbqyt_9EyEtIFoGnpWe4E";
    fetch("http://172.105.41.247:5004/api/v1/chats/send_message", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
  };

  const handleReceivedMessage = (event) => {
    const newMsg = JSON.parse(event);
    const newMsg1 = newMsg.data.message;
    // setActiveRoomMessages(event);
    // data.map((elm) => {
    // if (elm._id === newMsg.data.chat._id) {
    // console.log(data, "sam and push message");
    // }
    // });
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNiZTRkMjE4MGRkMjFiMjM4ZTdjMjRmIiwiaWF0IjoxNjczODc0MjU3LCJleHAiOjE2NzY0NjYyNTd9.YHZjuuIiWINgNbk94YNO5nbl0vjc3a6sXIxsGGuBgHA";
    fetch(
      `http://172.105.41.247:5004/api/v1/chats/${newMsg.data.chat._id}?page_no=1&page_size=10`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        // setMas(result.result.data.reverse());
        const oldMsg = result.result.data;
        oldMsg.push(newMsg1);
        fetchHistory(newMsg.data.chat._id);
        // console.log(oldMsg, "text messages_____--------__----");
      });
  };
  return (
    <div>
      <SocketConnection handleReceivedMessage={handleReceivedMessage} />
      <Container>
        <RoomBox>
          {data.map((elm) => {
            return (
              <>
                <UserBox
                  onClick={() => {
                    fetchHistory(elm._id);
                    setUserId(
                      elm.members[0] === "63bbd5ef745a6cf519ea7d42"
                        ? elm.members[1]
                        : elm.members[0]
                    );
                    setUserId(elm.member_users[1]._id);
                    // console.log(elm.members[0], "RoomUser id");
                  }}
                >
                  <LogoBtn>
                    {elm.member_users[1]?.first_name.match(/\b(\w)/g)}
                  </LogoBtn>
                  <NameDiv>
                    <p>
                      <span style={{ fontSize: "20px" }}>
                        {elm.member_users[1].first_name}
                      </span>
                      <br />
                      {elm.last_message.message}
                    </p>
                  </NameDiv>
                </UserBox>
              </>
            );
          })}
        </RoomBox>
        <HistoryBoxContainer>
          <HistoryBox>
            {mas.map((elm) => {
              // console.log(elm.sender_user._id, "uuuuuu");
              return elm.sender_user._id !== userId ? (
                <SendMsg>{elm.message}</SendMsg>
              ) : (
                <GetMsg>{elm.message}</GetMsg>
              );
            })}
          </HistoryBox>
          <InputDiv>
            <Input
              value={message}
              type="text"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <SendBtn
              onClick={() => {
                pushMsg();
                setMessage('')
              }}
            >
              <strong>send</strong>
            </SendBtn>
          </InputDiv>
        </HistoryBoxContainer>
      </Container>
    </div>
  );
};
export default ChatUi;
