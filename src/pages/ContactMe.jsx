import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import toast, { Toaster } from 'react-hot-toast';

const ContactMe = () => {

    const [state, handleSubmit] = useForm("xjvnzwgq");
    // const [check, setCheck] = useState(false);

    if (state.succeeded && !state.submitting) {
        // setCheck(true);
        toast.success('Submitted Successfully.', {
            style: {
                border: '1px solid rgb(250 204 21)',
                padding: '12px',
                fontSize: '1rem',
                color: 'white',
                backgroundColor: 'black',
            },
            iconTheme: {
                primary: 'rgb(250 204 21)',
                secondary: '#000',
            },
        });
    }
    else if(state.errors && !state.submitting) {
        // setCheck(true);
        toast.error('Submission Failed.', {
            style: {
                border: '1px solid #ff141480',
                padding: '12px',
                fontSize: '1rem',
                color: 'white',
                backgroundColor: 'black',
            },
            iconTheme: {
                primary: '#ff141480',
                secondary: '#000',
            },
        });
    }

    return (
        <div className="w-[90%] max-w-[700px] mx-auto mb-4 mt-2 bg-[#00000080] rounded-md py-2 px-4 shadow-matchCard">
            <Toaster/>

            <form onSubmit={handleSubmit} className='flex flex-col gap-6 py-4'>
            {/* <label htmlFor="text">
                Full Name
            </label> */}
            <input
                id="name"
                type="text" 
                name="name"
                placeholder='Enter your Full Name here...'
                spellCheck="false"
                autoComplete='off'
                className='bg-black border-b border-white py-2 px-4 text-white text-[1.2rem] placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:border-b-2'
            />
            <ValidationError 
                prefix="Name" 
                field="name"
                errors={state.errors}
            />

            {/* <label htmlFor="email">
                Email Address
            </label> */}
            <input
                id="email"
                type="email" 
                name="email"
                placeholder='Enter your Email address...'
                spellCheck="false"
                autoComplete='off'
                className='bg-black border-b border-white py-2 px-4 text-white text-[1.2rem] placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:border-b-2'
            />
            <ValidationError 
                prefix="Email" 
                field="email"
                errors={state.errors}
            />

            <input
                id="subject"
                type="text" 
                name="subject"
                placeholder='Enter the Subject...'
                spellCheck="false"
                autoComplete='off'
                className='bg-black border-b border-white py-2 px-4 text-white text-[1.2rem] placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:border-b-2'
            />
            <ValidationError 
                prefix="Subject" 
                field="subject"
                errors={state.errors}
            />

            {/* <label htmlFor="message">
                Message
            </label> */}
            <textarea
                id="message"
                name="message"
                rows="6"
                placeholder='Type your message here...'
                spellCheck="false"
                autoComplete='off'
                className='bg-black border-b border-white py-2 px-4 text-white text-[1.2rem] placeholder:text-slate-400 focus:outline-none focus:border-yellow-400 focus:border-b-2'
            />
            <ValidationError 
                prefix="Message" 
                field="message"
                errors={state.errors}
            />

            <div className='flex justify-center gap-8 text-[1.4rem]'>
                <button type='reset' className='py-1 px-4 border border-yellow-400 hover:bg-black transition duration-300'>Reset</button>

                <button type="submit" disabled={state.submitting} className='py-1 px-4 border border-yellow-400 hover:bg-black transition duration-300'>
                    {state.submitting ? "Submitting..." : "Submit"}
                </button>
            </div>
        </form>
        </div>
        
    );
}

export default ContactMe;