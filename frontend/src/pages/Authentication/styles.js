import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0 auto;
  transform: translate(-50%, -50%);

  h1 {
    margin-bottom: 10px;
    text-transform: lowercase;
  }

  a:link,
  a:visited {
    float: right;
    color: #797775;
    padding: 5px;
    margin-top: 5px;
    text-decoration: none;

    &:hover {
      color: #333;
      background-color: #dddddd;
    }
  }

  form {
    width: 500px;
    display: flex;
    flex-direction: column;

    input {
      height: 50px;
      border: none;
      text-align: left;
      font-size: 22px;
      font-family: 'Lato', sans-serif;
      border-bottom: 1px solid black;
      background-color: #f5f5f5;
    }

    input {
      margin-bottom: 10px;
    }

    button {
      display: inline-block;
      height: 50px;
      border: none;
      cursor: pointer;
      &:hover {
        background-color: #8c8989;
      }
    }
  }
`;
