import React from 'react';
import Dialog from 'react-dialog';

import 'react-dialog/css/index.css';

function Dailog(propss) {
  const { props } = propss;
  return props.open ? (
    <Dialog
      title="Lets play"
      modal
      // onClose={this.handleClose}
    //   buttons={[
    //     {
    //       text: 'Accept',
    //       onClick: () =>
    //     },
    //     {
    //       text: 'Refuse',
    //       onClick: () => this.handleClose(),
    //     },
    //   ]}
    >
      <h1>يلا نلعب ونتحدا بعض</h1>
      <p>{props.come_from}يريد اللعب معك </p>
      <button type="button" onClick={propss.handleAccept}>Accept</button>
    </Dialog>
  ) : null;
}
export default Dailog;
