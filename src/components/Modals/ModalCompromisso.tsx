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
  useDisclosure
} from '@chakra-ui/react'
import { Icon } from '@iconify/react/dist/iconify.js';
import "../global.css";
import * as React from "react";

interface Data {
  id: number,
  data: string
  onSave: (compromisso: compromissoDTO) => void
}

interface compromissoDTO {
  id: number,
  titulo: string,
  descricao: string,
  horario: string
}

export default function ModalCompromisso({ data, onSave, id }: Data) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [titulo, setTitulo] = React.useState("");
  const [descricao, setDescricao] = React.useState("");
  const [horario, setHorario] = React.useState("");

  function handleClose() {
    onClose();
    setTitulo("");
    setDescricao("");
    setHorario("");
  }

  return (
    <>
      <Icon onClick={onOpen} className="pointer" icon="mdi:plus-circle" color="black" width={20} />

      <Modal size={"xl"} isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar novo compromisso em {data}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Título do compromisso</FormLabel>
              <Input value={titulo} onChange={(event) => setTitulo(event.target.value)} placeholder='Título do compromisso' />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição do compromisso</FormLabel>
              <Input value={descricao} onChange={(event) => setDescricao(event.target.value)} placeholder='Descrição do compromisso' />
            </FormControl>
            <FormControl>
              <FormLabel>Horário do compromisso</FormLabel>
              <Input value={horario} onChange={(event) => setHorario(event.target.value)} placeholder='Horário do compromisso' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              Fechar
            </Button>
            <Button onClick={() => {
              onSave({ id: id, titulo, descricao, horario });
              handleClose();
            }} colorScheme='green'>{id > 0 ? "Alterar" : "Criar"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}