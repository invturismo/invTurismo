import React from 'react';
import { NavLink } from 'react-router-dom';
import GeneralTable from './GeneralTable';

const GeneralGet = ({children,h2Text,toFirst,toLast}) => {
  return (
    <div className="GeneralGet">
      <h2>{h2Text}</h2>
      <div className="ContainerMainGeneralGet">
        <div className="ContainerOptionsGeneralGet">
          <NavLink
            to={toFirst}
            className={({ isActive }) =>
              isActive ? "activeOptionGeneralGet" : undefined
            }
          >
            Sin completar
          </NavLink>
          <NavLink
            to={toLast}
            className={({ isActive }) =>
              isActive ? "activeOptionGeneralGet" : undefined
            }
          >
            Completados
          </NavLink>
        </div>
        <GeneralTable>{children}</GeneralTable>
      </div>
    </div>
  );
}

export default GeneralGet;