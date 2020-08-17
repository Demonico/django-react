import React, { Fragment, useContext } from 'react'
import { Formik, Form, useField } from 'formik'
import { Box, Button, TextField } from '@material-ui/core'
import * as yup from 'yup'

// context imports
import { movieContext } from '../store/MovieContext'

const ratingValidation = yup.object().shape({
  rating: yup.string().required('Rating is required.'),
  comments: yup.string(),
})

function RatingFields() {
  const [ratingField, ratingMeta, ratingHelpers] = useField('rating')
  const [commentsField, commentsMeta, commentsHelpers] = useField('comments')
  return (
    <Form>
      <Box my={2}>
        <TextField
          fullWidth
          select
          label="Rating"
          name="rating"
          error={ratingMeta.touched && ratingMeta.error}
          helperText={ratingMeta.error}
          {...ratingField}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </TextField>
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          multiline
          label="Comments"
          name="comments"
          rows={4}
          error={commentsMeta.touched && commentsMeta.error}
          helperText={commentsMeta.error}
          {...commentsField}
        />
      </Box>
      <Button variant="contained" color="secondary" type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default function AddRating({ handleClose }) {
  const { movieDetails = {}, postRating } = useContext(movieContext)

  const handleSubmit = (values) => {
    handleClose()
    postRating({ movie: movieDetails.pk, ...values })
  }
  return (
    <Fragment>
      <Box textAlign="center" component="h3" color="primary.main">
        {movieDetails?.title
          ? `Rate ${movieDetails.title}`
          : 'Select a rating.'}
      </Box>
      <Formik
        initialValues={{ rating: '', comments: '' }}
        validationSchema={ratingValidation}
        onSubmit={handleSubmit}
      >
        <RatingFields />
      </Formik>
    </Fragment>
  )
}
