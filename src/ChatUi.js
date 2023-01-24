import React, { useState, useEffect } from "react";
import {
  Container,
  HistoryBox,
  UserBox,
  LogoBtn,
  NameDiv,
  RoomBox,
  SendMsg,
  Input,
  InputDiv,
  SendBtn,
  GetMsg,
} from "./style";

const ChatUi = () => {
  const [data, setData] = useState([]);
  const [mas, setMas] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNiYmQ1ZWY3NDVhNmNmNTE5ZWE3ZDQyIiwiaWF0IjoxNjc0MTMxNzU1LCJleHAiOjE2NzY3MjM3NTV9.4-kTHPyMq1DYGsBgm2fGnOETVyCKpAUS5-DKWqyiGlU";
  const fetchData = () => {
    fetch("http://172.105.41.247:5004/api/v1/chats?page_no=1&limit=10", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
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
    setUserId(id);
    // console.log(id, "kidddddddddd");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNiZTRkMjE4MGRkMjFiMjM4ZTdjMjRmIiwiaWF0IjoxNjczODc0MjU3LCJleHAiOjE2NzY0NjYyNTd9.YHZjuuIiWINgNbk94YNO5nbl0vjc3a6sXIxsGGuBgHA";
    fetch(
      `http://172.105.41.247:5004/api/v1/chats/${id}?page_no=1&page_size=10`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setMas(result.result.data);
        // console.log(result.result.data, "text messages_____--------__----");
      });
  };

  const pushMsg = () => {
    // console.log(userId, "iddddddddd");
    let data = new FormData();
    data.append("to_send", userId);
    data.append("message", message);
    data.append("is_file", false);
    data.append("send_to_role", "vendor");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjNiZTRkMjE4MGRkMjFiMjM4ZTdjMjRmIiwiaWF0IjoxNjczODc0MjU3LCJleHAiOjE2NzY0NjYyNTd9.YHZjuuIiWINgNbk94YNO5nbl0vjc3a6sXIxsGGuBgHA";
    fetch("http://172.105.41.247:5004/api/v1/chats/send_message", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    });
  };
  return (
    <div>
      <Container>
        <RoomBox>
          {data.map((elm) => {
            return (
              <>
                <UserBox
                  onClick={() => {
                    fetchHistory(elm.members[1]);
                    // setUserId(elm.members[0]);
                    console.log(elm._id, "RoomUser id");
                  }}
                >
                  <LogoBtn>
                    {elm.member_users[0].first_name.match(/\b(\w)/g)}
                  </LogoBtn>
                  <NameDiv>
                    <p>
                      <span style={{ fontSize: "20px" }}>
                        {elm.member_users[0].first_name}
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
        <HistoryBox>
          {mas.map((elm) => {
            // console.log(elm.sender_user._id, "uuuuuu");
            return elm.sender_user._id === userId ? (
              <SendMsg>{elm.message}</SendMsg>
            ) : (
              <GetMsg>{elm.message}</GetMsg>
            );
          })}
          <InputDiv>
            <Input
              type="text"
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />
            <SendBtn
              onClick={() => {
                pushMsg();
              }}
            >
              <strong>send</strong>
            </SendBtn>
          </InputDiv>
        </HistoryBox>
      </Container>
    </div>
  );
};
export default ChatUi;
