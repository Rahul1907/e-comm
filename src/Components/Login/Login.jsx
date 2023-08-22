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
            console.log('user',user);
            setCookie('user-session',encodeURI(user.uId))
            navigate('/')
        }
        else{
            console.log('Wrong Id Pass');
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
                // ={handleOnSubmit}
                // onFinishFailed={onFinishFailed}
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