import { AppBar, Toolbar, Typography} from '@material-ui/core';
import React from 'react';

type ContentProps = {
  children:React.ReactNode;
}

const Layout:React.FC<ContentProps> = ({children}:ContentProps) => {
    return(
        <>
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Repo Query
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {children}
      </div>
        </>
    );
}
export default Layout;