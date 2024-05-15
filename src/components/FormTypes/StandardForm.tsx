import * as Icon from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { FormButton } from './types/models';

type Props = {
  open: boolean;
  formTitle: string;
  handleClose: () => void;
  formButtons: FormButton[];
  children: ReactNode;
};

export default function StandardForm({ open, formTitle, handleClose, formButtons, children }: Props) {
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <div className="flex items-center justify-between">
          <Typography fontSize={28}>{formTitle}</Typography>
          <IconButton onClick={handleClose}>
            <Icon.Close />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {formButtons.map((e) => {
          return (
            <Button
              key={e.id}
              onClick={e.onClick}
              variant={e.variant}
              color={e.color}
              disabled={e.loading && e.isSubmit}
            >
              {e.title}
            </Button>
          );
        })}
      </DialogActions>
    </Dialog>
  );
}
