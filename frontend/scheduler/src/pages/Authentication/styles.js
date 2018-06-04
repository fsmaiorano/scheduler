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

  form {
    width: 500px;
    display: flex;
    flex-direction: column;

    input {
      height: 50px;
      border: none;
      text-align: center;
      font-size: 17px;
    }

    input {
      margin-bottom: 10px;
    }

    button {
      display: inline-block;
      height: 50px;
      border: none;
    }
  }
`;
