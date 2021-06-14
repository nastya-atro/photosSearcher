import { Formik, Form, Field, FormikErrors } from 'formik';
import { ColorsType, OrderType } from '../Searcher-2-bll/SearchReducer';
import { useState } from 'react';

type SearchValuesType = {
    query: string,
    color: null | ColorsType,
    orderBy: OrderType
}

type PropsType = {
    searchPhotos: (query: string, orderBy: OrderType, color: null | ColorsType) => void
}

const searchValidate = (values: SearchValuesType) => {

    const errors: FormikErrors<SearchValuesType> = {};
    if (!values.query) {
        errors.query = 'Required';
    } else if (values.query.length > 20) {
        errors.query = 'Please, dont write more then 20 sumbols';
    }
    return errors;
}

const SearchForm: React.FC<PropsType> = ({ searchPhotos }) => {
    const [queryValues, setQueryValues] = useState([] as Array<string>)


    const search = (values: SearchValuesType, { setSubmitting }: any) => {
        searchPhotos(values.query, values.orderBy, values.color)
        setSubmitting(false);

        setQueryValues(oldArray => [...oldArray, values.query])

        let no_duplicate = queryValues.filter(function (item: any, pos: any) {
            return queryValues.indexOf(item) === pos;
        })

        localStorage.setItem('query', JSON.stringify(no_duplicate))
    }

    if (queryValues.length > 5) {
        queryValues.shift()
    }

    let rememberValue = JSON.parse(localStorage.getItem('query') as string)

    return (
        <Formik
            initialValues={{ query: '', color: null, orderBy: 'relevant' }}
            validate={searchValidate}
            onSubmit={search} >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting, isValid, errors }) => (
                <Form onSubmit={handleSubmit}>


                    <Field list="query" type="text" name="query" onChange={handleChange} onBlur={handleBlur} autocomplete="off"
                        value={values.query} />
                    <div> {errors.query}</div>

                    <datalist id='query'>
                        {rememberValue && rememberValue.map((r: any) => <option value={r} />)}
                    </datalist>


                    <label htmlFor='orderBy'>Order by sort:</label>
                    <Field component="select" id="orderBy" name="orderBy" onChange={handleChange} value={values.orderBy}>
                        <option value="relevant">Relevant</option>
                        <option value="latest ">Latest</option>
                    </Field>

                    <label htmlFor='color'>Filter results by color:</label>
                    <Field component="select" id="color" name="color" onChange={handleChange} value={values.color}>
                        <option value="black_and_white">black and white</option>
                        <option value="black ">black</option>
                        <option value="white">white</option>
                        <option value="yellow ">yellow</option>
                        <option value="orange">orange</option>
                        <option value="red ">red</option>
                        <option value="purple">purple</option>
                        <option value="magenta ">magenta</option>
                        <option value="green ">green</option>
                        <option value="teal">teal</option>
                        <option value="blue ">blue</option>
                    </Field>
                    
                    <button type="submit" disabled={!isValid || isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default SearchForm