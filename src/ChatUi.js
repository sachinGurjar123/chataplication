import React, { useState, useEffect } from "react";
import ApplicationTop from "./ApplicationTop";
import { format } from "date-fns";
import SocketConnection from "./SocketConnection";
import Avatar from "@mui/material/Avatar";
import AttachmentIcon from "@mui/icons-material/Attachment";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import { FormControl, InputAdornment, TextField } from "@material-ui/core";
import {
  Container,
  HistoryBoxContainer,
  UserBox,
  NameDiv,
  RoomBox,
  SendMsg,
  Box,
  TimeSendMsg,
  TimeGetMsg,
  SendBtn,
  GetMsg,
  OnlineBtn,
  HistoryBox,
} from "./style";
import { ListItem } from "@mui/material";

const ChatUi = () => {
  const [data, setData] = useState([]);
  const [mas, setMas] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("firstName");
  const [lastName, setLastName] = useState("lastName");
  const [lastMsg, setLastMsg] = useState("");
  const [hidden, setHidden] = useState(false);
  const [backgroundId, setBackgroundId] = useState("");
  // console.log(backgroundId, "ID11");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkMjA2YjU3NTZjOWMzZTJhOGIyNzY5IiwiaWF0IjoxNjc0ODAzNzQzLCJleHAiOjE2NzczOTU3NDN9.DCtGuW_63nIzQEsFzoPDB4Zc4i9jyG7aRrV_d2P0kak";
  const fetchData = () => {
    fetch(
      "http://172.105.41.247:5004/api/v1/chats?page_no=1&limit=100&user_id=63d206b5756c9c3e2a8b2769",
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
  // const name=()=>{
  //   fetchData();
  //   fetchHistory(backgroundId);
  // }
  useEffect(() => {
    fetchData();
    fetchHistory(backgroundId);
  }, [lastMsg]);
  const getFormattedDate = (date, is_time) => {
    let formattedString = "";
    if (is_time) {
      formattedString = format(new Date(date), "dd-MMM-yyyy, hh:mm aa");
    }
    return formattedString;
  };
  const fetchHistory = (id) => {
    // setUserId(id);

    // console.log(id, "kidddddddddd");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkMjA5ZTNkZTJlYTM0ZjU2YjY2YWJmIiwiaWF0IjoxNjc0NzExODE0LCJleHAiOjE2NzczMDM4MTR9.g5Jj_eJqhqGZxg-Mx4nx4Dzbqyt_9EyEtIFoGnpWe4E";
    fetch(
      `http://172.105.41.247:5004/api/v1/chats/${id}?page_no=1&page_size=100`,
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
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNkMjA2YjU3NTZjOWMzZTJhOGIyNzY5IiwiaWF0IjoxNjc0ODAzNzQzLCJleHAiOjE2NzczOTU3NDN9.DCtGuW_63nIzQEsFzoPDB4Zc4i9jyG7aRrV_d2P0kak";
    fetch("http://172.105.41.247:5004/api/v1/chats/send_message", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
  };

  const handleReceivedMessage = (event) => {
    const newMsg = JSON.parse(event);
    const newMsg1 = newMsg.data.message;
    setLastMsg(newMsg1);
    // setHidden(true);
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
      });
    // fetchHistory(backgroundId);
    // fetchHistory(backgroundId);
    // console.log(newMsg1, "ID22dsds");
  };

  return (
    <div>
      <SocketConnection handleReceivedMessage={handleReceivedMessage} />
      <Container>
        <ApplicationTop firstName={firstName} lastName={lastName} />
        <Box>
          <RoomBox>
            {data.map((elm) => {
              // console.log("new--msg",elm);
              return (
                <>
                  <UserBox
                    style={{
                      border:
                        backgroundId === elm._id ? "1px solid gray" : "none",
                    }}
                    onClick={() => {
                      // setHidden(false);
                      setLastMsg(elm.last_message.message);
                      setBackgroundId(elm._id);
                      fetchHistory(elm._id);
                      setFirstName(elm.member_users[1].first_name);
                      setLastName(elm.member_users[1].last_name);
                      setUserId(
                        elm.members[0] === "63d206b5756c9c3e2a8b2769"
                          ? elm.members[1]
                          : elm.members[0]
                      );
                      // console.log(userId, "RoomUser id");
                    }}
                  >
                    {elm.new_msg ? <OnlineBtn></OnlineBtn> : null}

                    <Avatar
                      sx={{ backgroundColor: "#9f78fa", marginLeft: "5px" }}
                    >
                      {elm.member_users[1]?.first_name.match(/\b(\w)/g)}
                      {elm.member_users[1]?.last_name.match(/\b(\w)/g)}
                    </Avatar>
                    <NameDiv>
                      <p>
                        <span style={{ fontSize: "20px" }}>
                          {elm.member_users[1].first_name}
                        </span>
                        <span style={{ fontSize: "20px", marginLeft: "7px" }}>
                          {elm.member_users[1].last_name}
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
                const date = getFormattedDate(elm.created_at, true);
                // console.log(data, "uuuuuu");
                return elm.sender_user._id !== userId ? (
                  <>
                    <SendMsg>{elm.message}</SendMsg>
                    <TimeSendMsg>{date}</TimeSendMsg>
                  </>
                ) : (
                  <>
                    <GetMsg>{elm.message}</GetMsg>
                    <TimeGetMsg>{date}</TimeGetMsg>
                  </>
                );
              })}
            </HistoryBox>
            <FormControl
              style={{
                position: "absolute",
                right: "4px",
                width: "98%",
                bottom: "6px",
              }}
            >
              <TextField
                value={message}
                type="text"
                onChange={(event) => {
                  setMessage(event.target.value);
                }}
                size="large"
                variant="outlined"
                placeholder="Type your message here…"
                className="msgSend"
                // onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {/* <KeyboardVoiceIcon style={{ color: "gray" }} />
                      <AttachmentIcon style={{ color: "gray" }} /> */}
                      <SendBtn
                        onClick={() => {
                          pushMsg();
                          setMessage("");
                        }}
                      >
                        <strong>Send</strong>
                      </SendBtn>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {/* <InputDiv>
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
                  setMessage("");
                }}
              >
                <strong>send</strong>
              </SendBtn>
            </InputDiv> */}
          </HistoryBoxContainer>
        </Box>
      </Container>
    </div>
  );
};
export default ChatUi;
