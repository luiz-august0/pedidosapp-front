import {
  AutocompleteProps,
  Autocomplete as MUIAutocomplete,
} from "@mui/material";

type Props = {
  getMore?: () => void;
  loading?: boolean;
} & AutocompleteProps<any, any, any, any>;

export default function Autocomplete({ getMore, loading, ...rest }: Props) {
  return (
    <MUIAutocomplete
      {...rest}
      ListboxProps={{
        style: { maxHeight: 300, overflow: "auto" },
        onScroll: (event: React.SyntheticEvent) => {
          const listboxNode = event.currentTarget;
          if (
            listboxNode.scrollTop + listboxNode.clientHeight ===
            listboxNode.scrollHeight
          ) {
            getMore?.();
          }
        },
      }}
      loading={loading}
      loadingText={"Carregando..."}
      disableCloseOnSelect
      noOptionsText="Nenhum resultado encontrado"
    />
  );
}
