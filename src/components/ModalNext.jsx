import React from 'react'
import { Modal, Button, Text } from "@nextui-org/react";
const ModalNext = ({bindings,setVisible}) => {
  return (
    <div>
         <Modal
            scroll
            width="400px"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
            {...bindings}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}></Text>
            </Modal.Header>
            <Modal.Body>
              <Text id="modal-description">Registro con Exito ✅</Text>
            </Modal.Body>
            <Modal.Footer>
              {/* <Link to={"/Allnoticias"}> */}
              <Button
                onClick={() => {
                  setVisible(false);
                }}
              >
                Continiar
              </Button>
              {/* </Link> */}
            </Modal.Footer>
          </Modal>
    </div>
  )
}

export default ModalNext;