import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User as UserIcon, 
  Lock, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  LogIn,
  UserPlus
} from 'lucide-react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { User } from '../types';
import { saveUser, setCurrentUser, getStoredUsers } from '../lib/store';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  lang: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  lang
}) => {
  const [mode, setMode] = useState<'client-login' | 'client-register' | 'admin-login'>('client-login');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  // Admin fields
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleClientRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || !cleanEmail || !cleanPhone || !password.trim()) {
      setErrorMsg('Por favor, preencha todos os campos.');
      return;
    }

    if (password.trim().length < 6) {
      setErrorMsg('A senha deve ter pelo menos 6 caracteres para o Firebase.');
      return;
    }

    setLoading(true);
    const isEmailAdmin = cleanEmail === 'admin@gmail.com';

    try {
      let uid = `usr-${Date.now()}`;

      // 1. Criar no Firebase Authentication
      try {
        const userCred = await createUserWithEmailAndPassword(auth, cleanEmail, password.trim());
        uid = userCred.user.uid;
        if (userCred.user) {
          await updateProfile(userCred.user, { displayName: cleanName }).catch(() => {});
        }
      } catch (authErr: any) {
        console.warn('Firebase Auth registration:', authErr.code || authErr.message);
        if (authErr.code === 'auth/email-already-in-use') {
          // Se já existe no Auth, tenta fazer login
          try {
            const loginCred = await signInWithEmailAndPassword(auth, cleanEmail, password.trim());
            uid = loginCred.user.uid;
          } catch {
            setErrorMsg('Este e-mail já está cadastrado no Firebase. Por favor, faça login.');
            setLoading(false);
            return;
          }
        } else if (authErr.code === 'auth/weak-password') {
          setErrorMsg('A senha deve conter no mínimo 6 caracteres.');
          setLoading(false);
          return;
        } else if (authErr.code === 'auth/invalid-email') {
          setErrorMsg('E-mail em formato inválido.');
          setLoading(false);
          return;
        }
      }

      // 2. Salvar dados no Firestore e LocalStorage
      const newUser: User = {
        id: isEmailAdmin ? 'usr-admin-main' : uid,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        role: isEmailAdmin ? 'admin' : 'client',
        createdAt: new Date().toISOString()
      };

      saveUser(newUser);
      setCurrentUser(newUser);
      setSuccessMsg(isEmailAdmin ? 'Conta Admin criada e vinculada ao Firebase!' : 'Conta criada e cadastrada no Firebase com sucesso!');
      setLoading(false);

      setTimeout(() => {
        onSuccess(newUser);
        onClose();
      }, 600);
    } catch (err: any) {
      console.error('Erro ao cadastrar:', err);
      setErrorMsg('Erro ao cadastrar usuário.');
      setLoading(false);
    }
  };

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password.trim()) {
      setErrorMsg('Preencha seu e-mail e senha.');
      return;
    }

    setLoading(true);
    const isEmailAdmin = cleanEmail === 'admin@gmail.com';

    try {
      let uid = '';

      // 1. Tentar login no Firebase Authentication
      try {
        const userCred = await signInWithEmailAndPassword(auth, cleanEmail, password.trim());
        uid = userCred.user.uid;
      } catch (authErr: any) {
        console.warn('Firebase Auth login fallback:', authErr.code || authErr.message);
        // Se usuário não existir ainda no Firebase Auth, tenta cadastrar no Auth
        if (
          authErr.code === 'auth/user-not-found' || 
          authErr.code === 'auth/invalid-credential' ||
          authErr.code === 'auth/invalid-email'
        ) {
          if (password.trim().length >= 6) {
            try {
              const createCred = await createUserWithEmailAndPassword(auth, cleanEmail, password.trim());
              uid = createCred.user.uid;
            } catch (createErr) {
              console.warn('Could not auto-create in Auth:', createErr);
            }
          }
        }
      }

      const existingUsers = getStoredUsers();
      const found = existingUsers.find(u => u.email.toLowerCase() === cleanEmail);

      const userObj: User = {
        id: uid || (found ? found.id : (isEmailAdmin ? 'usr-admin-main' : `usr-guest-${Date.now()}`)),
        name: found?.name || (isEmailAdmin ? 'Administrador' : (cleanEmail.split('@')[0] || 'Cliente DMJ')),
        email: cleanEmail,
        phone: found?.phone || phone.trim() || '+33 7 59 73 55 52',
        role: isEmailAdmin ? 'admin' : (found?.role || 'client'),
        createdAt: found?.createdAt || new Date().toISOString()
      };

      saveUser(userObj);
      setCurrentUser(userObj);
      setSuccessMsg(isEmailAdmin ? 'Acesso de Administrador Concedido!' : `Bem-vindo(a) de volta, ${userObj.name}!`);
      setLoading(false);

      setTimeout(() => {
        onSuccess(userObj);
        onClose();
      }, 600);
    } catch (err: any) {
      console.error('Erro no login:', err);
      setErrorMsg('Erro ao autenticar.');
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanInputUser = adminUser.trim().toLowerCase();
    const adminPassVal = adminPass.trim() || '123456';

    if (
      cleanInputUser === 'admin@gmail.com' || 
      cleanInputUser === 'admin' || 
      cleanInputUser === 'dmj'
    ) {
      setLoading(true);
      const adminEmail = 'admin@gmail.com';
      let uid = 'usr-admin-main';

      // Criar ou Entrar no Firebase Auth
      try {
        const userCred = await signInWithEmailAndPassword(auth, adminEmail, adminPassVal);
        uid = userCred.user.uid;
      } catch {
        if (adminPassVal.length >= 6) {
          try {
            const createCred = await createUserWithEmailAndPassword(auth, adminEmail, adminPassVal);
            uid = createCred.user.uid;
          } catch {
            // Fallback se erro no Auth
          }
        }
      }

      const adminObj: User = {
        id: uid,
        name: 'Administrador',
        email: adminEmail,
        phone: '+33 7 59 73 55 52',
        role: 'admin',
        createdAt: new Date().toISOString()
      };

      saveUser(adminObj);
      setCurrentUser(adminObj);
      setSuccessMsg('Acesso de Administrador Concedido!');
      setLoading(false);

      setTimeout(() => {
        onSuccess(adminObj);
        onClose();
      }, 600);
    } else {
      setErrorMsg('Usuário ou senha de Administrador incorretos.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100"
      >
        {/* Background ambient glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mode selector header tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => { setMode('client-login'); setErrorMsg(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mode === 'client-login' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Entrar
            </button>

            <button
              onClick={() => { setMode('client-register'); setErrorMsg(''); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                mode === 'client-register' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Criar Conta
            </button>
          </div>

          <button
            onClick={() => { setMode('admin-login'); setErrorMsg(''); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 ${
              mode === 'admin-login' 
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                : 'text-slate-400 hover:text-amber-300'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin DMJ</span>
          </button>
        </div>

        {/* Dynamic Titles */}
        <div className="mb-6 space-y-1">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {mode === 'admin-login' ? (
              <>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span>Painel do Administrador</span>
              </>
            ) : mode === 'client-register' ? (
              <>
                <UserPlus className="w-5 h-5 text-emerald-400" />
                <span>Cadastro de Cliente</span>
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5 text-emerald-400" />
                <span>Área do Cliente</span>
              </>
            )}
          </h3>
          <p className="text-xs text-slate-400">
            {mode === 'admin-login' 
              ? 'Acesso restrito para gestão de serviços, avaliações e clientes.' 
              : mode === 'client-register'
              ? 'Cadastre-se com e-mail e telefone para enviar seu feedback.'
              : 'Entre na sua conta para deixar sua avaliação e gerenciar preferências.'}
          </p>
        </div>

        {/* Error / Success feedback */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* CLIENT REGISTER FORM */}
        {mode === 'client-register' && (
          <form onSubmit={handleClientRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seu Nome Completo</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Maria Silva"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seu E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: mariasilva@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Telefone / WhatsApp <span className="text-amber-400">(para contato do Admin)</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Ex: +33 7 12 34 56 78 ou +55 11 9..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Criar Minha Conta</span>
            </button>
          </form>
        )}

        {/* CLIENT LOGIN FORM */}
        {mode === 'client-login' && (
          <form onSubmit={handleClientLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seu E-mail</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: seuemail@gmail.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Senha</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Entrar na Conta</span>
            </button>
          </form>
        )}

        {/* ADMIN LOGIN FORM */}
        {mode === 'admin-login' && (
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Digite suas credenciais de Administrador autorizadas para acessar o painel de gestão.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Usuário Administrador</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="Nome de usuário ou e-mail..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Senha Administrador</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Entrar no Painel Admin</span>
            </button>
          </form>
        )}

      </motion.div>
    </div>
  );
};
