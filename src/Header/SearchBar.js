import axios from "axios";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";
import { useState, useEffect, useContext } from "react";
import { AiOutlineSearch as MagGlass } from 'react-icons/ai'

import SearchResults from "./SearchResults";
import ClickContext from "../Contexts/HeaderClickContext.js";
import UrlContext from "../Contexts/UrlContext";

function SearchBar() {
  const token = localStorage.getItem('token');
  const [searchInfo, setSearchInfo] = useState([]);
  const { click, setClick } = useContext(ClickContext);
  const [searchString, setSearchString] = useState('');
  const BASE_URL = useContext(UrlContext);

  if (searchString === '') {
    setClick(false);
  }


  useEffect(() => {
    if (searchString.length < 3) return;

    const URL = BASE_URL + `users/${searchString}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const promise = axios.get(URL, config);

    promise.then(response => {
      setSearchInfo(response.data);
      setClick(true);
    });

    promise.catch(err => console.log(err));
  }, [searchString]);

  return (
    <>
      <Form>
        <MagGlass />
        <DebounceInput
          placeholder='Search for people'
          element='input'
          minLength={3}
          debounceTimeout={300}
          value={searchString}
          onChange={e => setSearchString(e.target.value)} />

        {
          !click ?
            ''
            :
            <Results>
              {
                searchInfo.map(result => {
                  return <SearchResults user={result} setClick={setClick} setSearchString={setSearchString} />
                })
              }
            </Results>
        }

      </Form>

      {
        click ?
          <Background onClick={() => { setClick(false); setSearchString('') }}></Background>
          :
          ''
      }
    </>
  )
}

export default SearchBar;

const Form = styled.form`
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;
  font-size: 15px;
  color: rgba(81, 81, 81, 1);
  font-weight: 600;
  font-family: 'Lato';

  svg{
    position:absolute;
    right: 10px;
    color: rgba(198, 198, 198, 1);
    font-size: 24px;
    z-index:3;
  }

  input{
    width: 100%;
    height: 40px;
    border:none;
    border-radius: 8px;
    padding:0 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    z-index:2;
    font-size: 15px;
    font-family:var(--link-font);
    font-size: 16px;
    
    ::placeholder{
      display:flex;
      justify-content: space-between;
      font-family:var(--link-font);
      color: rgba(198, 198, 198, 1);
      font-size: 16px;
    }

    :focus{
      outline:none;
    }
  }

  @media(max-width: 460px){
    position: absolute;
    top: 70px;
    left: 10px;
    width: 95%; 
  }
`

const Results = styled.section`
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #E7E7E7;
  z-index:1;
  padding-top: 15px;

  @media(max-width: 460px){
    z-index: 5;
  }
`

const Background = styled.div`
  position:absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;

  @media(max-width: 460px){
    z-index: 3;
  }
`