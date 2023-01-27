import styled from "styled-components";
export const Container = styled.div`
  box-shadow: rgb(58 53 65 / 56%) 0px 2px 10px 0px;
`;

export const Box = styled.div`
  border-radius: 5px;
  height: 450px;
  display: grid;
  grid-template-columns: 1.2fr 3fr;
  grid-template-rows: 1fr;
`;

export const RoomBox = styled.div`
  border-top: 1px solid #bbbdbf;
  border-right: 1px solid #bbbdbf;
  height: 429px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 10px;
`;
export const UserBox = styled.div`
  display: flex;
  align-items: center;
  // border: 1px solid gray;
  border-radius: 5px;
  margin-top: 10px;
  overflow: hidden;
  // z-index: -1;
  position: relative;
`;

export const NameDiv = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;

export const HistoryBoxContainer = styled.div`
  border-top: 1px solid #bbbdbf;
  height: 450px;
  position: relative;
`;

export const SendMsg = styled.p`
  background-color: rgb(141, 76, 206);
  color: white;
  align-self: end;
  width: max-content;
  min-width: 50px;
  border-radius: 5px;
  padding: 10px 5px;
  position: relative;
  box-sizing: border-box;
  margin-top: -1px;
`;
export const Input = styled.input`
  width: 85%;
  border-radius: 10px;
  height: 25px;
`;
export const InputDiv = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 495px;
  height: 40px;
  background-color: rgb(97, 97, 97);
`;
export const SendBtn = styled.button`
  padding: 10px 20px;
  margin-left: 5px;
  border-radius: 10px;
  cursor: pointer;
  background-color: rgb(141, 76, 206);
  color: white;
  border: none;
`;
export const GetMsg = styled.p`
  background-color: white;
  border: 1px solid gray;
  align-self: start;
  width: max-content;
  min-width: 50px;
  border-radius: 5px;
  padding: 10px 5px;
  position: relative;
  box-sizing: border-box;
  margin-top: -1px;
`;
export const HistoryBox = styled.div`
  height: 380px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  overflow-x: hidden;
  // border: 2px solid red;
`;
export const TopBoxes = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 3fr;
  height: 60px;
  grid-template-rows: 1fr;
  // background-color: aquamarine;

  // box-shadow: rgb(58 53 65 / 56%) 0px 2px 10px 0px;
`;
export const TopLeftBox = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 12px;
  align-items: center;
  border-right: 1px solid #bbbdbf;
`;
export const TopRightTBox = styled.div`
  // background-color: aquamarine;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // border: 1px solid red;
`;
export const TopRightLeftBox = styled.div`
  display: flex;
  justify-content: space-around;
  // align-items: center;
  // border: 1px solid red;
  margin-left: 20px;
`;

export const TopRightRightRtBox = styled.div`
  display: flex;
  color: gray;
  margin-right: 20px;
  // align-items: center;
  // border: 1px solid red;
`;
export const TimeSendMsg = styled.span`
  font-size: 12px;
  color: gray;
  margin-top: -13px;
  margin-bottom: 17px;
  align-self: end;
`;
export const TimeGetMsg = styled.span`
  font-size: 12px;
  color: gray;
  margin-top: -13px;
  margin-bottom: 17px;
  align-self: start;
`;
export const OnlineBtn = styled.span`
  position: absolute;
  top: 13px;
  z-index: 2;
  height: 10px;
  width: 10px;
  margin-left: 30px;
  color: green;
  border-radius: 50%;
  background-color: green;
`;
