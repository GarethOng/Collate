import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

function EditContact() {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    editContactName,
    editContactGmail,
    editTelegram,
    editContactRelationship,
    contactOptions,
    handleChange,
    editContact,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!editContactName || !editContactGmail || !editContactRelationship) {
      displayAlert()
      return
    }

    if (isEditing) {
      editContact()
      return
    }
  }
  const handleContactInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>edit contact</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* name */}
          <FormRow
            type='text'
            name='editContactName'
            labelText='name'
            value={editContactName}
            handleChange={handleContactInput}
          />
          {/* gmail */}
          <FormRow
            type='text'
            name='editContactGmail'
            labelText='email'
            value={editContactGmail}
            handleChange={handleContactInput}
          />
          {/* telegram */}
          <FormRow
            type='text'
            name='editTelegram'
            labelText='telegram'
            value={editTelegram}
            handleChange={handleContactInput}
          />
          {/* relationship type */}
          <FormRowSelect
            name='editContactRelationship'
            labelText='relationship type'
            value={editContactRelationship}
            handleChange={handleContactInput}
            list={contactOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default EditContact
