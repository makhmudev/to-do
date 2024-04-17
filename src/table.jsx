import './table.css'
import Data from './data.json'
import React, { useRef, useState } from 'react'

const Table = () => {
    const [data, setData] = useState(Data)
    const [editState, setEditState] = useState(-1)
    return (
        <div className='tableWrap'>
            <div className='componentWrap'>
                <AddMember setData={setData} />
                <form onSubmit={handleUpdate}>
                    <table className='table'>
                        <thead className='headTable'>
                            <th>ismim</th>
                            <th>tel nomer</th>
                            <th>Action</th>
                        </thead>
                        {data.map((current) => (
                            editState === current.id ? <EditMember current={current} data={data} setData={setData} /> :
                                <tr className='Tr'>
                                    <td>{current.name}</td>
                                    
                                    <td>{current.phone}</td>
                                    <td className='act'>
                                        
                                        <button type='button' className='btnDelete' onClick={() => handleDelete(current.id)}>Delete</button>
                                    </td>
                                </tr>
                        ))}
                    </table>
                </form>
            </div>
        </div>
    )

    function handleUpdate(event) {
        event.preventDefault()
        const name = event.target.elements.name.value
        const email = event.target.elements.email.value
        const phone = event.target.elements.phone.value
        const updatedData = data.map(d => d.id === editState ? {...d, name:ism, email:email, phone:phone} : d);
        setEditState(-1)
        setData(updatedData)
    }

    function handleEdit(id) {
        setEditState(id)
    }

    function handleDelete(id) {
        const updatedData = data.filter((d) => id !== d.id)
        setData(updatedData)
    }
}


const EditMember = ({ current, data, setData }) => {
    function handleName(event) {
        const name = event.target.value;
        const updatedData = data.map((d) => d.id === current.id ? { ...d, name: name } : d)
        setData(updatedData)
    }
    function handleEmail(event) {
        const email = event.target.value;
        const updatedData = data.map((d) => d.id === current.id ? { ...d, email: email } : d)
        setData(updatedData)
    }
    function handlePhone(event) {
        const phone = event.target.value;
        const updatedData = data.map((d) => d.id === current.id ? { ...d, phone: phone } : d)
        setData(updatedData)
    }
    return (
        <tr>
            <td><input type="text" onChange={handleName} value={current.name} name='name' placeholder='Enter name' className='inputAdd' /></td>
            <td><input type="text" onChange={handleEmail} value={current.email} name='email' placeholder='Enter email' className='inputAdd' /></td>
            <td><input type="text" onChange={handlePhone} value={current.phone} name='phone' placeholder='Enter phone' className='inputAdd' /></td>
            <td><button type='submit' className='btnAdd'>Update</button></td>
        </tr>
    )
}

const AddMember = ({ setData }) => {
    const nameRef = useRef()
    
    const phoneRef = useRef()
    const handleValues = (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value
        
        const phone = event.target.elements.phone.value
        const newMember = {
            id: 4,
            name,
           
            phone,
        }
        setData(prevData => prevData.concat(newMember))
        nameRef.current.value = "";
        phoneRef.current.value = "";
    }
    return (
        <form className='inputWrap' onSubmit={handleValues}>
            <input type="text" name='name' placeholder='Enter name' className='inputAdd' ref={nameRef} />
            
            <input type="text" name='phone' placeholder='Enter phone' className='inputAdd' ref={phoneRef} />
            <button className='btnAdd'>Add</button>
        </form>
    )
}

export default Table;