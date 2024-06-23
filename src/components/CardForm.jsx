import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './CardForm.css'; // Import custom CSS for styling
import { Link } from 'react-router-dom';

// Define validation schema using Yup
const validationSchemaCity = Yup.object().shape({
  city: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const validationSchemaName = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

const validationSchemaType = Yup.object().shape({
  type: Yup.string()
    .required('Required'),
});

const CardForm = () => {
  const [data, setData] = useState([]);
  const username = localStorage.getItem('username');

  // Initial form values
  const initialValues = {
    city: '',
    name: '',
    type: '',
  };

  // Handle form submission by city
  const handleSubmitByCity = (values) => {
    const city = values.city;
    axios.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=3`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleSubmitByName = (values) => {
    const name = values.name;
    axios.get(`https://api.openbrewerydb.org/v1/breweries?by_name=${name}&per_page=3`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  const handleSubmitByType = (values) => {
    const type = values.type;
    axios.get(`https://api.openbrewerydb.org/v1/breweries?by_type=${type}&per_page=3`)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  };

  return (
    <>
    <div className='body'>
      <h3 className='heading'>Hello {username}, Welcome to Brewery Review App!</h3>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Welcome to the Brewery Review App!</h5>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaCity}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmitByCity}
            >
              {({ handleSubmit, validateForm }) => (
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  validateForm().then(() => handleSubmit());
                }}>
                  <div className="form-group">
                    <label htmlFor="city">Search by city</label>
                    <div className="input-group">
                      <Field
                        type="text"
                        name="city"
                        className="form-control"
                      />
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                      >
                        Search
                      </button>
                    </div>
                    <ErrorMessage
                      name="city"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaName}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmitByName}
            >
              {({ handleSubmit, validateForm }) => (
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  validateForm().then(() => handleSubmit());
                }}>
                  <div className="form-group">
                    <label htmlFor="name">Search by name</label>
                    <div className="input-group">
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                      />
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                      >
                        Search
                      </button>
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </Form>
              )}
            </Formik>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchemaType}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmitByType}
            >
              {({ handleSubmit, validateForm }) => (
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  validateForm().then(() => handleSubmit());
                }}>
                  <div className="form-group">
                    <label htmlFor="type">Search by type</label>
                    <div className="input-group">
                      <Field
                        type="text"
                        name="type"
                        className="form-control"
                      />
                      <button
                        type="submit"
                        className="btn btn-outline-primary"
                      >
                        Search
                      </button>
                    </div>
                    <ErrorMessage
                      name="type"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="card wide-card">
          <div className="card-body">
            <h1>Here is your search data</h1>
            {data.length > 0 ? (
              data.map((brewery) => (
                <div className="brewery-info" key={brewery.id}>
                  <p>
                    <Link to={`/brewery/${brewery.id}`}>
                      {brewery.name} - {brewery.brewery_type} -</Link> {brewery.city}, {brewery.state}
                    
                  </p>
                </div>
              ))
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default CardForm;
