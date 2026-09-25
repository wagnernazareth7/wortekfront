import { useCallback, useEffect, useState } from 'react'
import {
    Building2,
    Pencil,
    Plus,
    Search,
    UserRound,
    X,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const initialForm = {
    tipo: 'particular',
    nome: '',
    nuit: '',
    email: '',
    telefone: '',
    telefone_alternativo: '',
    endereco: '',
    cidade: '',
    observacoes: '',
    estado: 'ativo',
}

function Clientes() {
    const { hasPermission } = useAuth()

    const [clientes, setClientes] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [modalOpen, setModalOpen] = useState(false)
    const [editingId, setEditingId] = useState(null)
    const [form, setForm] = useState(initialForm)

    const canCreate = hasPermission('cliente.criar')
    const canEdit = hasPermission('cliente.editar')

    const loadClientes = useCallback(async (term = '') => {
        setLoading(true)
        setError('')

        try {
            const response = await api.getClientes(term)
            setClientes(response.clientes ?? [])
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadClientes()
    }, [loadClientes])

    function handleSearch(event) {
        event.preventDefault()
        loadClientes(search)
    }

    function openCreate() {
        setEditingId(null)
        setForm(initialForm)
        setError('')
        setSuccess('')
        setModalOpen(true)
    }

    function openEdit(cliente) {
        setEditingId(cliente.id)

        setForm({
            tipo: cliente.tipo ?? 'particular',
            nome: cliente.nome ?? '',
            nuit: cliente.nuit ?? '',
            email: cliente.email ?? '',
            telefone: cliente.telefone ?? '',
            telefone_alternativo: cliente.telefone_alternativo ?? '',
            endereco: cliente.endereco ?? '',
            cidade: cliente.cidade ?? '',
            observacoes: cliente.observacoes ?? '',
            estado: cliente.estado ?? 'ativo',
        })

        setError('')
        setSuccess('')
        setModalOpen(true)
    }

    function closeModal() {
        if (saving) return

        setModalOpen(false)
        setEditingId(null)
        setForm(initialForm)
    }

    function handleChange(event) {
        const { name, value } = event.target

        setForm((current) => ({
            ...current,
            [name]: value,
        }))
    }

    async function handleSubmit(event) {
        event.preventDefault()

        setSaving(true)
        setError('')
        setSuccess('')

        try {
            if (editingId) {
                await api.updateCliente(editingId, form)
                setSuccess('Cliente actualizado com sucesso.')
            } else {
                await api.createCliente(form)
                setSuccess('Cliente registado com sucesso.')
            }

            setModalOpen(false)
            setEditingId(null)
            setForm(initialForm)

            await loadClientes(search)
        } catch (err) {
            setError(err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <section className="clients-page">
            <div className="page-header">
                <div>
                    <h1 className="page-title">Clientes</h1>
                    <p className="page-description">
                        Consulte, registe e actualize os clientes da Wortek Store.
                    </p>
                </div>

                {canCreate && (
                    <button
                        type="button"
                        className="primary-button"
                        onClick={openCreate}
                    >
                        <Plus size={18} />
                        Novo cliente
                    </button>
                )}
            </div>

            {success && (
                <div className="feedback-message success-message">
                    {success}
                </div>
            )}

            {error && !modalOpen && (
                <div className="feedback-message error-message">
                    {error}
                </div>
            )}

            <div className="content-card clients-card">
                <div className="clients-toolbar">
                    <form
                        className="search-form"
                        onSubmit={handleSearch}
                    >
                        <div className="search-input-wrapper">
                            <Search size={18} />

                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Pesquisar por nome, telefone, email ou NUIT"
                            />
                        </div>

                        <button
                            type="submit"
                            className="secondary-button"
                            disabled={loading}
                        >
                            Pesquisar
                        </button>

                        {search && (
                            <button
                                type="button"
                                className="text-button"
                                onClick={() => {
                                    setSearch('')
                                    loadClientes('')
                                }}
                            >
                                Limpar
                            </button>
                        )}
                    </form>

                    <span className="clients-count">
                        {clientes.length} cliente{clientes.length === 1 ? '' : 's'}
                    </span>
                </div>

                {loading ? (
                    <div className="table-state">
                        A carregar clientes...
                    </div>
                ) : clientes.length === 0 ? (
                    <div className="table-state">
                        Nenhum cliente encontrado.
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Contacto</th>
                                    <th>NUIT</th>
                                    <th>Cidade</th>
                                    <th>Estado</th>
                                    <th aria-label="Acções" />
                                </tr>
                            </thead>

                            <tbody>
                                {clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>
                                            <div className="client-identity">
                                                <div className="client-type-icon">
                                                    {cliente.tipo === 'empresa' ? (
                                                        <Building2 size={17} />
                                                    ) : (
                                                        <UserRound size={17} />
                                                    )}
                                                </div>

                                                <div>
                                                    <strong>{cliente.nome}</strong>
                                                    <span>
                                                        {cliente.email || 'Sem email'}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.nuit || '—'}</td>
                                        <td>{cliente.cidade || '—'}</td>

                                        <td>
                                            <span
                                                className={`status-badge ${cliente.estado === 'ativo'
                                                        ? 'status-active'
                                                        : 'status-inactive'
                                                    }`}
                                            >
                                                {cliente.estado === 'ativo'
                                                    ? 'Activo'
                                                    : 'Inactivo'}
                                            </span>
                                        </td>

                                        <td className="table-actions">
                                            {canEdit && (
                                                <button
                                                    type="button"
                                                    className="icon-button"
                                                    onClick={() => openEdit(cliente)}
                                                    title="Editar cliente"
                                                >
                                                    <Pencil size={17} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {modalOpen && (
                <div className="modal-backdrop">
                    <div
                        className="client-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="client-modal-title"
                    >
                        <div className="modal-header">
                            <div>
                                <h2 id="client-modal-title">
                                    {editingId ? 'Editar cliente' : 'Novo cliente'}
                                </h2>

                                <p>
                                    {editingId
                                        ? 'Actualize os dados do cliente.'
                                        : 'Preencha os dados para registar um novo cliente.'}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="icon-button"
                                onClick={closeModal}
                                aria-label="Fechar"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div className="feedback-message error-message">
                                    {error}
                                </div>
                            )}

                            <div className="client-form-grid">
                                <label className="form-field">
                                    <span>Tipo *</span>
                                    <select
                                        name="tipo"
                                        value={form.tipo}
                                        onChange={handleChange}
                                    >
                                        <option value="particular">Particular</option>
                                        <option value="empresa">Empresa</option>
                                    </select>
                                </label>

                                <label className="form-field">
                                    <span>Estado *</span>
                                    <select
                                        name="estado"
                                        value={form.estado}
                                        onChange={handleChange}
                                    >
                                        <option value="ativo">Activo</option>
                                        <option value="inativo">Inactivo</option>
                                    </select>
                                </label>

                                <label className="form-field form-field-full">
                                    <span>Nome *</span>
                                    <input
                                        name="nome"
                                        value={form.nome}
                                        onChange={handleChange}
                                        maxLength={180}
                                        required
                                    />
                                </label>

                                <label className="form-field">
                                    <span>NUIT</span>
                                    <input
                                        name="nuit"
                                        value={form.nuit}
                                        onChange={handleChange}
                                        maxLength={30}
                                    />
                                </label>

                                <label className="form-field">
                                    <span>Email</span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        maxLength={150}
                                    />
                                </label>

                                <label className="form-field">
                                    <span>Telefone *</span>
                                    <input
                                        name="telefone"
                                        value={form.telefone}
                                        onChange={handleChange}
                                        maxLength={30}
                                        required
                                    />
                                </label>

                                <label className="form-field">
                                    <span>Telefone alternativo</span>
                                    <input
                                        name="telefone_alternativo"
                                        value={form.telefone_alternativo}
                                        onChange={handleChange}
                                        maxLength={30}
                                    />
                                </label>

                                <label className="form-field">
                                    <span>Cidade</span>
                                    <input
                                        name="cidade"
                                        value={form.cidade}
                                        onChange={handleChange}
                                        maxLength={100}
                                    />
                                </label>

                                <label className="form-field">
                                    <span>Endereço</span>
                                    <input
                                        name="endereco"
                                        value={form.endereco}
                                        onChange={handleChange}
                                        maxLength={255}
                                    />
                                </label>

                                <label className="form-field form-field-full">
                                    <span>Observações</span>
                                    <textarea
                                        name="observacoes"
                                        value={form.observacoes}
                                        onChange={handleChange}
                                        rows={4}
                                    />
                                </label>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={closeModal}
                                    disabled={saving}
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="submit"
                                    className="primary-button"
                                    disabled={saving}
                                >
                                    {saving
                                        ? 'A guardar...'
                                        : editingId
                                            ? 'Guardar alterações'
                                            : 'Registar cliente'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Clientes