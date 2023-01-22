import { useEffect, useState } from "react"
import { CirclesWithBar } from  'react-loader-spinner'

import { Searchbar } from "components/Searchbar/Searchbar"
import { Btn, Container, Img } from "./App.styled"
import {getPhotos} from "../api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";


export const App = () =>{

    const [page, setPage] = useState(1);
    const [photos, setPhotos] = useState([]);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalInfo, setModalInfo] = useState(null);
    const [status, setStatus] = useState('idle');
    
    useEffect(() => {
      if (!filter) {
        return
      }
      setStatus("loading")
      getPhotos(filter, page)
  .then(photo => {
    setStatus("success")
    setPhotos(prevState => prevState.concat(photo.hits))
        })
  .catch(error => {
    setStatus("error")
  })
    }, [filter, page]);
    
    const loadMore = () =>{
      setPage(prevPage => prevPage + 1)
     }

     const toggleModal = () =>{
       setShowModal(prevModal => !prevModal)
     }

     const handleSubmit =  async text =>{
       setFilter(text)
       setPage(1)
       setPhotos([])
    }
    const materialInfo = (info) => {
      setModalInfo(info)

    }
  return (
  
    <Container>

 
      {showModal && <Modal onClose = {toggleModal}><Img src={modalInfo.largeImageURL}/></Modal> }
      <Searchbar onSubmit = {handleSubmit}/>
      {status === 'success' && <ImageGallery materials={photos} toggleModal = {toggleModal} materialInfo = {materialInfo}/>}
      {status === 'loading' && <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
      />}
      <Btn type="button" onClick={loadMore}>LoadMore</Btn>
    </Container>
  )
}
