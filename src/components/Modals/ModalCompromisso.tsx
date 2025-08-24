import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  FormHelperText,
  FormErrorMessage
} from '@chakra-ui/react'
import "../global.css";
import * as React from "react";

interface Data {
  data: string
  onSave: (compromisso: compromissoDTO) => void,
  onDelete: (compromisso: compromissoDTO) => void
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  objCompromisso: compromissoDTO,
  titulo: string,
  setTitulo: React.Dispatch<React.SetStateAction<string>>,
  descricao: string,
  setDescricao: React.Dispatch<React.SetStateAction<string>>
  horario: string,
  setHorario: React.Dispatch<React.SetStateAction<string>>
}

interface compromissoDTO {
  id: number,
  titulo: string,
  descricao: string,
  horario: string
}

interface changer{
  inputValue: string,
  setValue: React.Dispatch<React.SetStateAction<string>>
}

export default function ModalCompromisso({ data, onSave, isOpen, onClose, onOpen, objCompromisso, titulo, setTitulo, descricao, setDescricao, horario, setHorario, onDelete }: Data) {
  const [isErrorTitulo, setIsErrorTitulo] = React.useState(false);
  const [isErrorHorario, setIsErrorHorario] = React.useState(false);

  function handleClose() {
    onClose();
    setTitulo("");
    setDescricao("");
    setHorario("");
    setIsErrorHorario(false); // Tira o erro
    setIsErrorTitulo(false); // Tira o erro
    objCompromisso = { id: 0, titulo: "", descricao: "", horario: "" };
  }

  function handleCriar() {
    
    if (!titulo.trim()) {
      setIsErrorTitulo(true); // Marca o erro
      return;
    }

    if (!horario.trim()) {
      setIsErrorHorario(true); // Marca o erro
      return;
    }
    onSave({ id: objCompromisso.id, titulo, descricao, horario });
    handleClose();

  }

  React.useEffect(() => {
    if (objCompromisso.titulo !== "") {
      setTitulo(objCompromisso.titulo);
      setDescricao(objCompromisso.descricao);
      setHorario(objCompromisso.horario);
    }
  }, [objCompromisso])

  return (
    <>
      <Modal size={"xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{objCompromisso.id > 0 ? "Alterar" : "Criar novo"} compromisso em {data}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl p="2" isRequired>
              <FormLabel>Título do compromisso</FormLabel>
              <Input isInvalid={isErrorTitulo} value={titulo} onChange={(event) => {
                  setTitulo(event.target.value);
                  setIsErrorTitulo(false);
              }} placeholder='Título do compromisso' />
              {isErrorTitulo && (
                <FormHelperText>O título é obrigatório, descreva bremente seu compromisso.</FormHelperText>
              )}
            </FormControl>
            <FormControl p="2" >
              <FormLabel>Descrição do compromisso</FormLabel>
              <Input value={descricao} onChange={(event) => setDescricao(event.target.value)} placeholder='Descrição do compromisso' />
            </FormControl>
            <FormControl p="2" isRequired>
              <FormLabel>Horário do compromisso</FormLabel>
              <Input isInvalid={isErrorHorario} value={horario} onChange={(event) => {
                  setHorario(event.target.value)
                  setIsErrorHorario(false);
              }} placeholder='Horário do compromisso' />
              {isErrorHorario && (
                <FormHelperText>O horário é obrigatório, digite o horário do seu compromisso.</FormHelperText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {objCompromisso.id > 0 && (
              <Button onClick={() => {
                onDelete(objCompromisso);
                handleClose();
              }} colorScheme='red' mr={3}>Excluir</Button>
            )}
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={handleCriar} colorScheme='green'>{objCompromisso.id > 0 ? "Alterar" : "Criar"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}