import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'
import { useState } from 'react'

const SearchContainer = () => {
  const {
    isLoading,
    handleChange,
    sort,
    sortOptions,
    contactOptions,
    filter,
    showRead,
    showReadOption,
  } = useAppContext()
  const [search, setSearch] = useState('')
  const [contact, setContact] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleChange({ name: 'keyword', value: search })
    handleChange({ name: 'contactSearch', value: contact })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    handleChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h4>search form</h4>
        <div className='form-center'>
          {/* search position */}

          <FormRow
            type='text'
            name='keyword'
            value={search}
            handleChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <FormRow
            type='text'
            name='contact'
            value={contact}
            handleChange={(e) => {
              setContact(e.target.value)
            }}
          />

          <FormRowSelect
            name='sort'
            value={sort}
            list={sortOptions}
            handleChange={handleSearch}
          />

          <FormRowSelect
            name='filter'
            value={filter}
            list={contactOptions}
            handleChange={handleSearch}
          />

          <FormRowSelect
            name='showRead'
            labelText='show all?'
            value={showRead}
            list={showReadOption}
            handleChange={handleSearch}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'submit'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer
