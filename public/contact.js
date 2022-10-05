
var modal = `<div id="mymodal" style="display:none;" class="modal fade" role="dialog">
<div class="modal-dialog">  
  <div class="modal-content">
    <div class="modal-header">
    <h5 id=modal-title class="modal-title" data-test="success_msg"></h5>
    <button class="close" data-dismiss="modal">&times;</button>
    </div>
    <div id="modal-content" class="modal-body"></div>
    <div class="modal-footer">
      <button id=mail_btn class="btn btn-primary send_btn">Send</button>
      <button id=final_close data-bs-dismiss=modal class="btn btn-primary">Close</button>
    </div>
  </div>
</div>
</div>`

document.body.insertAdjacentHTML("afterbegin", modal);

var modalTitle = document.getElementById('modal-title')
var modalContent = document.getElementById('modal-content')
