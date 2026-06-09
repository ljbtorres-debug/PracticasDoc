export interface ParameterFormProps {
    mode: "create" | "edit";
    item: ParameterEntity | null;
    title: string;
    placeholder: string;
    loading: boolean;

    create: (data: ParameterEntity) => Promise<void>;
    update: (data: ParameterEntity, id: number) => Promise<void>;
    onClose: () => void;
    onSuccess: () => void;
}

export interface ParameterEntity {
    id?: number;
    name: string;
}