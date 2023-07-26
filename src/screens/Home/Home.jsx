import React from 'react'
import './Home.scss'
import Banner from '../../components/screens/Home/Banner/Banner'
import Collection from '../../components/shared/Collections/Collection'
// import Collections from '../../components/Collections/Collections'

function Home(){

  // const [name, setName] = useState(null);
  // const [showError, setShowError] = useState(false);

  // function handleName(e){
  //   setName(e.target.value);
  //   setShowError(false);
  // }

  // function validate(){
  //   if(name){
  //     let dataObj = {
  //       name: name
  //     }

  //     axios.post('http://localhost:8080/invoiceData', dataObj)
  //     .then(data => console.log(data));
  //   }
  //   else{
  //     setShowError(true);
  //   }
  // }

  return (
    <div className='home-container'>
      <Banner />
      <Collection />
      {/* <div className="form">
        {showError &&
          <h6>Type your name</h6>
        }
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" placeholder='Name..' onChange={handleName}/>
        <div className='btn' onClick={validate}>Press Button</div>
      </div> */}
    </div>
  )
}

export default Home