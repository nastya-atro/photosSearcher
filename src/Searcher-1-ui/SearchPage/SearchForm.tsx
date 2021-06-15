import { Formik, Form, Field, FormikErrors } from 'formik';
import s from './SearchPage.module.css'
import { useState } from 'react';
import { FormControl, InputLabel, Select, Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { ColorsType, OrderType } from '../../Searcher-2-bll/SearchReducer';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 300,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);


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
        errors.query = 'Required - EMPTY SEARCH VALUE';
    } else if (values.query.length > 20) {
        errors.query = 'Please, dont write more then 20 sumbols';
    }
    return errors;
}

const SearchForm: React.FC<PropsType> = ({ searchPhotos }) => {
    const classes = useStyles();
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

                    <div className={s.inputSerch_error}> {errors.query}</div>
                    <Field placeholder='Search...' list="query" type="text" name="query" onChange={handleChange} onBlur={handleBlur} autocomplete="off"
                        value={values.query} className={s.inputSerch} />


                    <datalist id='query' >
                        {rememberValue && rememberValue.map((r: any) => <option value={r} />)}
                    </datalist>
                    <div className={s.selectFormControls}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="orderBy">Sort by order</InputLabel>
                            <Select native id="orderBy" name="orderBy" onChange={handleChange} value={values.orderBy} >
                                <option value="relevant">Relevant</option>
                                <option value="latest ">Latest</option>
                            </Select>
                        </FormControl>

                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="color">Sort by color</InputLabel>
                            <Select native id="color" name="color" onChange={handleChange} value={values.color} >
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
                            </Select>
                        </FormControl>
                    </div>
                    <div className={s.buttonSearch}>
                        <Button variant="contained" color="default" type="submit" disabled={!isValid || isSubmitting}>
                            Search
                        </Button>
                    </div>


                </Form>
            )}
        </Formik>
    )
}

export default SearchForm