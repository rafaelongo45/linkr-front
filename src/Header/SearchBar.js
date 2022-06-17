import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {AiOutlineSearch as MagGlass} from 'react-icons/ai'
import { DebounceInput } from "react-debounce-input";
import SearchResults from "./SearchResults";

function SearchBar(){
  const token = localStorage.getItem('token');
  const [searchInfo, setSearchInfo] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(()=> {
    if(searchString.length < 3) return;
  
    const URL = `http://localhost:4000/users/${searchString}`
    const config = {
      headers:{
        'Authorization': `Bearer ${token}`
      }
    };

    const promise = axios.get(URL, config);

    promise.then(response => setSearchInfo(response.data));
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
          onChange = {e => setSearchString(e.target.value)}/>

          {
            searchInfo.length === 0 ?
            ''
              :
            <Results>
              {
                searchInfo.map(result => {
                  return <SearchResults user={result}/>
                })
              }
            </Results>
          }
      </Form>

      
    </>
  )
}

export default SearchBar;

const Form = styled.form`
  width: 30%;
  display:flex;
  align-items:center;
  justify-content:center;
  position:relative;

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
`

const Results = styled.section`
  position:absolute;
  top: 30px;
  left:0;
  width: 100%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: #E7E7E7;
  z-index:1;
  padding-top: 15px;
`