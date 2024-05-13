import { Chip } from '@mui/material';

export default function ActiveChip({ active }: { active: boolean }) {
  if (active) {
    return (
      <Chip
        label="Ativo"
        sx={{ backgroundColor: 'rgb(209, 250, 223)', color: 'rgb(2, 122, 72)', fontWeight: 'bold' }}
      />
    );
  } else {
    return (
      <Chip
        label="Inativo"
        sx={{ backgroundColor: 'rgb(254, 228, 226)', color: 'rgb(180, 35, 24)', fontWeight: 'bold' }}
      />
    );
  }
}
