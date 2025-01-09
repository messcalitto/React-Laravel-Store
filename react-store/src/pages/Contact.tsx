import React from 'react';
import Swal from 'sweetalert2';

const Contact = () => {
   //  const [message, setMessage] = React.useState(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        Swal.fire({
            title: 'Success',
            text: 'Your message has been sent successfully',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    }

    return (
        <section className="why_section layout_padding">
         <div className="container">
            
         
            <div className="col-lg-8 offset-lg-2 p-1 pb-4">
                <div className="full">
                    <h3 style={{fontSize: '22px',color: '#555555', fontWeight: 500}}>Contact us</h3>
                </div>
            </div>
         
            {/* {message && 
            <div className="alert alert-success">
               {message}  
            </div>
            } */}
            

            <div className="row">
               <div className="col-lg-8 offset-lg-2">
                  <div className="full">
                     <form onSubmit={handleSubmit}>
                        
                        <fieldset>
                           <input type="text" placeholder="Enter your full name" name="name" required />
                           <input type="email" placeholder="Enter your email address" name="email" required />
                           <input type="text" placeholder="Enter subject" name="subject" required />
                           <textarea placeholder="Enter your message" name="text" required></textarea>
                           <input type="submit" value="Submit" />
                        </fieldset>
                     </form>
                  </div>
               </div>
            </div>

            
         </div>
      </section>
    );
}

export default Contact;
