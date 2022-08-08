import React, { Component } from "react";
import styled from "styled-components";
import "./App.css";
import newBtn from "./img/add.png";
import trashBtn from "./img/delete.png";
import forest from "./img/forest.jpg";

export const BgHolder = styled.section`
  background-image: url(${forest});
  background-repeat: no-repeat;
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  width: clamp(300px, 50%, 80%);
  background: linear-gradient(to top, white, yellow);
  margin: 0 auto;
  padding-top: .5rem;
  border-radius: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-family: "Caveat", cursive;
    color: black;
  }
`;

export const InputWrapper = styled.div`
  width: clamp(300px, 25vw, 500px);
  border-radius: 5px;
  padding: 0 .2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  input {
    width: clamp(300px, 25vw, 500px);
    height: 35px;
    border-radius: 10px;
    border: 2px solid blueviolet;
    font-size: clamp(1rem, 1.5vw, 2rem);
    font-family: "Source Sans Pro", sans-serif;
    outline: none;
  }

  button {
    width: 35px;
    height: 35px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: limegreen;
  }
`;

export const TaskWrapper = styled.div`
  width: clamp(300px, 25vw, 500px);
  border-radius: 5px;
  padding: 0 .2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  ::after,
  ::before{
    content: '';
    width: 100%;
    height: 3px;
    display: block;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.5s ease-out;
  }

  ::before{
    background: linear-gradient(to left, #ff3d7f 50%, blueviolet 50%);
    position: absolute;
    top: -0.5rem;
    background-size: 0%;
  }

  ::after{
    background: linear-gradient(to right, blueviolet 50%, #ff3d7f 50%);
    position: absolute;
    bottom: .5rem;
    background-size: 0%;
  }

  :hover::after {
    background-position: right;
    background-size: 200%;
  }

  :hover::before {
    background-position: left;
    background-size: 200%;
  }

  ul {
    width: 85%;
    list-style: none;
  }

  ul > li {
    font-size: clamp(0.9rem, 1.5vw, 2rem);
    font-family: "Source Sans Pro", sans-serif;
    word-wrap: break-word;
  }

  button {
    width: 35px;
    height: 35px;
    border: 2px solid black;
    border-radius: 50%;
    background-color: red;
    cursor: pointer;
  }

  img {
    width: 20px;
    height: 20px;
  }
`;

export default class App extends Component {
  state = {
    task: "",
    list: [],
  };

  handleChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  };

  enter = (e) => {
    if (this.state.task.length > 0 && e.key === "Enter") {
      this.setState({
        list: this.state.list.concat({
          task: this.state.task,
          id: Date.now(),
        }),
        task: "",
      });
    }
  };

  add = () => {
    if (this.state.task !== "" && !this.state.task.match(/^[ \t]+$/)){
      this.setState({
        list: this.state.list.concat({
          task: this.state.task,
          id: Date.now(),
        }),
        task: "",
      });
    }
  };

  remove = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
  };

  render() {
    return (
      <BgHolder>
        <ContentWrapper>
          <h1>Lista de Tarefas</h1>
          <InputWrapper>
            <input
              onChange={this.handleChange}
              value={this.state.task}
              onKeyPress={this.enter}
            />
            <button onClick={this.add}>
              <img src={newBtn} alt="add" />
            </button>
          </InputWrapper>
          {this.state.list.map((item) => (
            <TaskWrapper>
              <ul>
                <li>{item.task}</li>
              </ul>
              <button onClick={() => this.remove(item.id)}>
                <img src={trashBtn} alt="trash" />
              </button>
            </TaskWrapper>
          ))}
        </ContentWrapper>
      </BgHolder>
    );
  }
}
