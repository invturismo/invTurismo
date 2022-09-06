import React from 'react';
import { NavLink } from 'react-router-dom';
import Filter from './Filter/Filter';
import LabelFilter from './Filter/LabelFilter';
import GeneralHeader from './GeneralHeader';
import GeneralTable from './GeneralTable';
import PaginationSection from './Pagination/PaginationSection';

const GeneralGet = ({children,h2Text,toFirst,toLast,linkOptions,others}) => {
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
        <GeneralHeader linkOptions={linkOptions} />
        <Filter />
        <LabelFilter />
        <GeneralTable>{children}</GeneralTable>
        <PaginationSection others={others} />
      </div>
    </div>
  );
}

export default GeneralGet;