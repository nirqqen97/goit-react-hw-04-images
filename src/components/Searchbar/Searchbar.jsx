import { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from "prop-types";
import { Header, BtnLabel, Button, Form, Input } from "./Searchbar.styled"

export const Searchbar = ({onSubmit}) =>{
  const [value, setValue] = useState("");
  const handleChange = e => {
    setValue(e.currentTarget.value)  ///если не будет работать проверить тут
  }
  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(value)
    setValue("")
  }
  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <AiOutlineSearch size={25}/>
          <BtnLabel>Search</BtnLabel>
        </Button>
        <Input
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={value}
        />
      </Form>
    </Header>
  )
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}