import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";

const Chat = () => {
  const initialMessages = [
    { text: "Bom dia, como você está?", type: "system" },
    { text: "Bom dia! Estou bem e você?", type: "user" },
    {
      text: "Estou aqui para ajudar! Como posso ser útil hoje?",
      type: "system",
    },
  ];

  const users = [
    { id: 1, name: "Gabriel Padoveze" },
    { id: 2, name: "Pedro Marcelo" },
    { id: 3, name: "Gustavo Antunes" },
  ];

  const [activeUserId, setActiveUserId] = useState(1);
  const [messages, setMessages] = useState(initialMessages);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { text: currentMessage, type: "user" }]);
      setCurrentMessage("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        style={{ display: "flex", width: "800px", height: "500px" }}
      >
        <div
          style={{
            flex: "1",
            overflow: "auto",
            borderRight: "1px solid #e0e0e0",
          }}
        >
          <List>
            {users.map((user) => (
              <ListItem
                button
                key={user.id}
                onClick={() => setActiveUserId(user.id)}
                style={{
                  backgroundColor:
                    activeUserId === user.id ? "#e0e0e0" : "transparent",
                }}
              >
                <ListItemAvatar>
                  <Avatar>{user.name[0]}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </div>
        <div style={{ flex: "2", position: "relative", padding: "10px" }}>
          <Paper
            elevation={3}
            style={{
              width: "100%",
              height: "100%",
              overflow: "auto",
              position: "relative",
            }}
          >
            <List style={{ maxHeight: "70%", overflowY: "auto" }}>
              {messages.map((message, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    style={{
                      flexDirection:
                        message.type === "user" ? "row-reverse" : "row",
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar>{message.type === "user" ? "U" : "S"}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={message.text}
                      primaryTypographyProps={{
                        style: {
                          backgroundColor:
                            message.type === "user" ? "#2563eb" : "#e0e0e0",
                          color:
                            message.type === "user" ? "#ffffff" : "#000000",
                          borderRadius: "12px",
                          padding: "8px",
                          margin: "8px",
                        },
                      }}
                    />
                  </ListItem>
                  {index !== messages.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                width: "90%",
                padding: "0 20px",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                variant="contained"
                color="primary" // Você pode manter ou remover esta linha, pois estamos sobrescrevendo a cor de fundo com a propriedade `style`
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                style={{ marginTop: "10px", backgroundColor: "#808080" }} // #808080 é um valor hexadecimal para cinza
              >
                Enviar
              </Button>
            </div>
          </Paper>
        </div>
      </Paper>
    </div>
  );
};

export default Chat;
