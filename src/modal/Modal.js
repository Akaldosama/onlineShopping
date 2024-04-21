import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";


export default function ModalComponent({ open, toggle, itemCount, itemPrice, itemModel, itemSize }) {
  const [card, setCard] = useState('');
  const [fullName, setFullName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState()
  
  
  const sendTelegram = () => {
    var token ='5829616485:AAH4Zgk4PsjafE4aHu3ZEGgek0IbPm-ItaI'
    var xhttp = new XMLHttpRequest();
    var chatId = '1368941825'
    var url = 'https://api.telegram.org/bot'+token+'/sendMessage?chat_id='+chatId+'&text=FirstName: '+fullName+', '
                                                                                       +'Phone: '      +phone +', '
                                                                                       +'Payment Type: ' +card+', '
                                                                                       +'Address: '  +address+ ', '
                                                                                       +'Model: '   +itemModel+', '  
                                                                                       +'Amount: ' +itemCount+ ', '
                                                                                       +'Price: '  +itemPrice+', '
                                                                                       +'Size: '    +itemSize;
    xhttp.open('GET',url,true);
    xhttp.send();
    alert('Succesfully Sent');
    toggle()
    setCard('')
    setFullName('')
    setAddress('')
    setPhone('')
  }
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader>Add your Card</ModalHeader>
        <ModalBody>
          <form>
            <input type="text" value={fullName} placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} className="form-control my-2" />
            <select value={card} onChange={(e) => setCard(e.target.value)} className="form-control my-2">
              <option value="" hidden>Choose a payment type</option>
              <option value="Terminal">Terminal</option>
              <option value="Cash">Cash</option>
              <option value="Click">Click</option>
            </select>
            <input type="text" placeholder="+998991234567" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control my-2" />
            <input type="text" placeholder="Exact Location" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="submit" onClick={sendTelegram} className="btn btn-info">
            Order
          </button>
          <button onClick={toggle} className="btn btn-light border">
            Cancel
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
