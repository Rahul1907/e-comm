import { Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { users } from '../../jsonData'
import { setCookie } from '../../utils/utils'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const[userName,setUserName] = useState('')
    const[password,setPassword] = useState('')
    const navigate = useNavigate()

    const handleOnSubmit = () =>{
        let user = users.find((x)=>(x.uName===userName && x.uPassword === password))
        if(user){
            // directly storing userid in session
            // I no its not good idea to directly store ID but in this case I have done it to maintain sassion.
            // otherwise we could have stored in encoded form 
            setCookie('user-session',(user.uId))
            navigate('/')
        }
        else{
            alert('Wrong Id Password');
        }
    }

    return (
        <div>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={handleOnSubmit}
                className='login-form'
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input value={userName} onChange={(e)=>{setUserName(e.target.value)}} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Login