
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useState } from 'react';

function Login(){
    
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const handleSubmit = () =>{

    }
    return (

        <>
        <div className='min-h-screen flex items-center justify-center px-4 py-8'>
            <div className='w-full max-w-md'>
                <div className='bg-white shadow-2xl rounded-2xl overflow-hidden '>
                    <div>
                        <h2>Welcome Back</h2>
                        <p>
                            Sign in to continue 
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <div>
                                <div>
                                    <Mail/> 
                                </div>
                                <input type="text" />
                            </div>
                            <div>
                                <div>
                                    <Lock/>
                                    <input type="text" name="" id="" />
                                    <button></button>
                                </div>
                                {error && (<p>{error}</p>)}
                                <button>
                                    {loading ? 'Signing In..':'Sign In'}
                                </button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <button>
                            Foget password?
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Login;