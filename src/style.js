import styled from "styled-components";

export const Container = styled.div`
  border-radius: 5px;
  height: 500px;
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-template-rows: 1fr;
`;

export const RoomBox = styled.div`
  border: 2px solid green;
  border-radius: 5px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;
export const UserBox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid gray;
  border-radius: 5px;
  margin-top: 10px;
`;

export const LogoBtn = styled.button`
  border-radius: 50%;
  height: 30px;
`;

export const NameDiv = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const HistoryBox = styled.div`
  border: 2px solid green;
  border-radius: 5px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const SendMsg = styled.p`
  background-color: rgb(141, 76, 206);
  color: white;
  float: right;
  width: 60%;
  border-radius: 5px;
  padding: 5px;
  //   border: 2px solid red;
  position: relative;
  box-sizing: border-box;
  margin-top: -1px;
`;
export const Input = styled.input`
  width: 90%;
  border-radius: 10px;
  height: 25px;
`;
export const InputDiv = styled.div`
  width: 59%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 540px;
  height: 40px;
  background-color: rgb(97, 97, 97);
`;
export const SendBtn = styled.button`
  padding: 10px 5px;
  margin-left: 5px;
  border-radius: 10px;
  cursor: pointer;
`;
export const GetMsg = styled.p`
  background-color: rgb(138, 65, 65);
  color: white;
  float: left;
  width: 60%;
  border-radius: 5px;
  padding: 5px;
  //   border: 2px solid red;
  position: relative;
  box-sizing: border-box;
`;
