import React , { useState }  from 'react'
import service from '../../utils/service';
import typingDNA from '../../utils/typingDNA';
const typingService = typingDNA();
const Login = ({ onLogin, onSelect }) => {
    const [inputValue, setInputValue] = useState('');
    const changeInputValue = ({ target: { value } }) => {
        setInputValue(value);
      };
    
    const handleLogin = async () => {
        try {
          const response = await service.post(
            `verify/${inputValue.toLowerCase()}`,
            {
              tp: typingService.getTypingPattern({ type: 1 }),
            }
          );
    
          if (response.status === 200) {
            onLogin(true);
          }
        } catch (error) {}
    
        setInputValue('');
      };
    
    return (
        
            <div className="bottom-side ">
<InputForm
  size="large"
  placeholder="Type your full name to login"
  value={inputValue}
  onChange={changeInputValue}
  onSubmit={handleLogin}
/>
<Button
  isPrimary
  value="I'm a new user"
  onClick={() => onSelect(true)}
/>
        </div>
    )
}

export default Login



