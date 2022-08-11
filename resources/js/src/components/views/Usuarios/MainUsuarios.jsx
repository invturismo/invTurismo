import React from 'react'
import CreateUsuarios from './ComponentsOfUsuarios/CreateUsuarios';
import GetRecordUsuarios from './ComponentsOfUsuarios/GetRecordUsuarios';
import GetUsuarios from './ComponentsOfUsuarios/GetUsuarios';
import UpdatePassword from './ComponentsOfUsuarios/UpdatePassword';
import UpdateUsuarios from './ComponentsOfUsuarios/UpdateUsuarios';
import { StyleMainUsuarios } from './StyleMainUsuarios';

const MainUsuarios = ({who}) => {
  return (
    <StyleMainUsuarios>
      {who === 1 && <GetUsuarios />}
      {who === 2 && <CreateUsuarios />}
      {who === 3 && <GetRecordUsuarios />}
      {who === 4 && <UpdateUsuarios />}
      {who === 5 && <UpdatePassword />}
    </StyleMainUsuarios>
  );
}

export default MainUsuarios