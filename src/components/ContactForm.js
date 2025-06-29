import { Formik } from 'formik';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const EMAILJS_CONFIG = {
    service_id: "YOUR_EMAILJS_SERVICE_ID",
    template_id: "YOUR_EMAILJS_TEMPLATE_ID",
    public_key: "YOUR_EMAILJS_PUBLIC_KEY"
  }

  return (
    <div className="contacts-form">
      <Formik
        initialValues = {{ user_email: '', user_name: '', subject: '', message: '' }}
        validate = { values => {
            const errors = {};
            if (!values.user_email) {
                errors.user_email = 'Required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.user_email)
            ) {
                errors.user_email = 'Invalid email address';
            }
            return errors;
        }}
        onSubmit = {( values, { setSubmitting } ) => {
            const form = document.getElementById("cform");
            const status = document.getElementById("contactFormStatus");

            emailjs
            .sendForm(EMAILJS_CONFIG.service_id, EMAILJS_CONFIG.template_id, form, {
                publicKey: EMAILJS_CONFIG.public_key,
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    status.innerHTML = "<h5>Thanks, your message is sent successfully.</h5>";
                    status.style.display = 'block';
                    form.reset();
                },
                (error) => {
                    console.log('FAILED...', error);
                    status.innerHTML = "<h5>Oops! There was a problem submitting your form</h5>";
                },
            );

            setSubmitting(false);
        }}
        >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} id="cform" action={"/"}>

        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="group">
              <label>
                Your Full Name <b>*</b>
                <input 
                  type="text"
                  name="user_name" 
                  id="user_name"
                  required="required" 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name} 
                />
              </label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
            <div className="group">
              <label>
                Your Email Address <b>*</b>
                <input 
                  type="email" 
                  id="user_email"
                  name="user_email"
                  required="required"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} 
                />
              </label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="group">
              <label>
                Your Subject <b>*</b>
                <input 
                  type="text" 
                  id="subject"
                  name="subject"
                  required="required"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.subject} 
                />
              </label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="group">
              <label>
                Your Message <b>*</b>
                <textarea
                  name="message" 
                  id="message"
                  className="mil-mb30 mil-up"
                  required="required"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message} 
                />
              </label>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right">
            <div className="terms-label">
              * Accept the terms and conditions.
            </div>
            <button
              type="submit"
              className="btn"
            >
              <span>Send Message</span>
            </button>
          </div>
        </div>

        <div className="form-status alert-success" id="contactFormStatus" style={{"display": "none"}} />
      </form>
      )}
      </Formik>
    </div>
  );
};
export default ContactForm;
