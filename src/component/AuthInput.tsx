import React, { ChangeEvent, useState, useEffect } from "react";
import styled from "styled-components";

type PageProps = {
    name: string;
    placeholder: string;
    label: string;
    match?: string;
    type: string;
    errorMsg: string;
    setSharedState?: React.Dispatch<React.SetStateAction<string>>
}

const Label = styled.label`
 margin-bottom: 1rem;
 color: #21334F;
 font-weigth: 600;
 display: block;
`
const Input = styled.input`
 border-width: 0.13rem;
 border-style: solid;
 color: grey;
 outline: unset;
 width: calc(100% - 2.2rem);
 padding: 0.4rem 1rem;
 font-size: 0.9rem;
 line-height: 1.5rem;
 height: 1.3rem;
`

const AuthInput = (props: PageProps) => {
    const { label, name, placeholder, type, errorMsg, setSharedState } = props;
    const [err, errOccured] = useState(false);
    const [value, setValue] = useState("");
    const [color, setColor] = useState('#CFD0D145')

    function handleInput(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value.trim());
        if(typeof setSharedState !== 'undefined') {
            setSharedState(e.target.value.trim());
        }
        if(type === 'email') {
            const atposition = value.indexOf("@");  
            const dotposition = value.lastIndexOf(".");  
            if ((atposition < 1) || (dotposition < atposition+2) || (dotposition >= value.length)){  
                setColor('red');
                errOccured(true);
            }  else {
                if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            }
        }
        if(type === 'password') {
            if (new RegExp('^[a-zA-Z0-9]{4,30}$').test(value)) {
                if(props.match){
                    if(value !== props.match) {
                        setColor('red');
                        errOccured(true);
                    } else {
                        if(color !== '#CFD0D145'){
                            setColor('green');
                            errOccured(false);
                            setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                        }
                    }
                } else if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            } else {
                setColor('red')
                errOccured(true)
            }
        }
    }

    useEffect(()=>{
        if(props.match){
            if(value !== props.match) {
                setColor('red');
                errOccured(true);
            } else {
                if(color !== '#CFD0D145'){
                    setColor('green');
                    errOccured(false);
                    setTimeout(()=>{ setColor('#CFD0D145') }, 700)
                }
            }
        }
    }, [value, color])

    return (
        <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <Label>{label}</Label>
            <Input
                type={type}
                value={value}
                style={{ borderColor: `${color}`}}
                placeholder={`Enter ${placeholder}`}
                // onChange={onChange}
                onInput={handleInput}
                onBlur={handleInput}
                name={name}
            />
            {
                !err ?  null : <small style={{ color: `${color}`}}>{errorMsg}</small>
            }
        </div>
    )
}

export default AuthInput;