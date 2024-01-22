import React from 'react'
import Button from '../../../component/Button'

const NewProduct = () => {

  return (
    <>

      <section className='w-3/4 p-10 font-Montserrat text-my-primary border rounded-md shadow-sm bg-white mx-auto translate-y-0'>

        <form onSubmit={{}}>

          <div className='productForm'> 

              <label> Product Title <span className='required'> * </span></label> <br />
              <input type='text' value={{}} onChange={{}} placeholder='' name='title' maxLength={30}/>
              
              
              <div className='price'>
                  <label> Price <span className='required'> * </span></label> <br />
                  <input type='text' value={{}} onChange={{}} placeholder='' name='price'/>
              </div>

              {/* <div className='photo'>
                  <div className='customerFileBtn'>
                      <label>Upload photo of product <span className='required'> * </span> </label> <br />
                      <input type="file" name='image' accept="image/*" multiple onChange={(e) => {setImage(e.target.files[0])}} /> 
                      <button type="submit" onClick={handleUpload} className='uploadPhoto'> upload photo </button> {message && <span className='upload'> {message} </span>}
                  </div>

                  <div className='uploadWrapper'>
                      {allImage &&
                          allImage.map((photo, _id) => (
                              <div className='imageContainer'  key={_id}>
                                  <img src={`../../../../../productphoto/${photo.filename}`} alt={photo.filename} />
                                  <AiFillDelete className='deleteIcon' onClick={() => {handleDeleteImage(photo._id)}}></AiFillDelete>
                              </div> 
                          ))
                      
                      }
                  </div>
              </div> */}

              <div className='description'>
                  <label> Description <span className='required'> * </span></label> <br />
                  <textarea value={{}} onChange={{}} placeholder='' name='description'  minLength={1} maxLength={400} rows={6} cols={105}></textarea>
              </div>

              {/* <div className='category'>
                  <label> Select category <span className='required'> * </span> </label>  <br />
                  <select value = {productForm.category} onChange={handleChange} name='category'>
                      <option value = "------"> ------------------------------ </option>
                      {availableProductCategory.map((category, index) => (
                          <option value={category} key={index}> {category} </option>
                      ))}
                      
                  </select>
              </div> */}

              <div className='brand'>
                  <label> Brand <span className='required'> * </span></label> <br />
                  <input type='text' value={{}} onChange={{}} placeholder='' name='brand'/>
              </div>

              <div className='stockQty'>
                  <label> Quantity in stock <span className='required'> * </span></label> <br />
                  <input type='number' value={{}} onChange={{}} placeholder='' name='stockQty'  min={1}/>
              </div>

              <div className='text-center'>
                <Button margin='20px 0px' padding='10px 70px'> Click to submit </Button>
              </div>

          </div>

        </form>

      </section>

    </>
  )
}

export default NewProduct