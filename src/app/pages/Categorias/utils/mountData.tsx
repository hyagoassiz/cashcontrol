import { Tooltip } from "@mui/material";
import { ICategoria } from "../interfaces";
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IMountData {
    categorias: ICategoria[]
    
}

export function mountData ({categorias} : IMountData): any {
    if (categorias?.length) {
        // Ordena as categorias por nome
        categorias.sort((a, b) => a.nome.localeCompare(b.nome));

        // Mapeia as categorias ordenadas
        return categorias.map((categoria) => ({
            id: categoria.id,
            nome: categoria.nome,
            tipo: categoria.tipo,
            situacao: (categoria.ativo === true ? 'Ativo' : 'Inativo'),
            options: (
                <Tooltip placement="top" title='Opções'>
                    <MoreVertIcon/>
                </Tooltip>
            )
        }));
    }
    return [];
}