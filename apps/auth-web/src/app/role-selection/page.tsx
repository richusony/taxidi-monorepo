"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import { User, Briefcase, ShieldCheck, Car, LogOut, ArrowRight, ChevronRight, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";

type Role = 'CUSTOMER' | 'PARTNER' | 'ADMIN';

interface RoleConfig {
  id: Role;
  title: string;
  description: string;
  icon: typeof User;
  color: string;
}

const ROLES: RoleConfig[] = [
  {
    id: 'CUSTOMER',
    title: 'Customer',
    description: 'Browse, book, and enjoy premium rentals.',
    icon: User,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: 'PARTNER',
    title: 'Partner',
    description: 'Manage your vehicle fleet and earnings.',
    icon: Briefcase,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
  {
    id: 'ADMIN',
    title: 'Administrator',
    description: 'System control, analytics, and management.',
    icon: ShieldCheck,
    color: 'bg-zinc-100 dark:bg-zinc-900',
  },
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [userRoles, setUserRoles] = useState<Role[]>([]);

  useEffect(() => {
    const rolesStr = sessionStorage.getItem('userRoles');
    if (rolesStr) {
      try {
        const roles = JSON.parse(rolesStr) as Role[];
        setUserRoles(roles);
      } catch (e) {
        setUserRoles(['CUSTOMER']);
      }
    } else {
      // For demo purposes, if no roles found, show all
      setUserRoles(['CUSTOMER', 'PARTNER', 'ADMIN']);
    }
  }, []);

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    // In a real app, this would update session/token for the selected role
    setTimeout(() => {
      router.push('/'); // Redirect to the specific dashboard/home
    }, 300);
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-900 p-4 font-sans gap-4">
      {/* Mobile Frame Simulation */}
      <div className="relative w-full max-w-[400px] h-[800px] max-h-[90vh] bg-white dark:bg-zinc-950 rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-zinc-900 dark:border-zinc-800 flex flex-col">
        {/* Status Bar Mock */}
        <div className="h-6 w-full flex justify-between px-8 items-center pt-2">
          <span className="text-[10px] font-bold">9:41</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full border border-zinc-900 dark:border-zinc-100" />
            <div className="w-3 h-3 rounded-full bg-zinc-900 dark:bg-zinc-100" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-8 flex flex-col">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-zinc-900 dark:bg-white p-2 rounded-xl">
                  <Car className="h-4 w-4 text-white dark:text-black" />
                </div>
                <span className="text-zinc-900 dark:text-white text-lg font-black tracking-tighter uppercase">TAXIDI</span>
              </div>
              <button 
                // variant="ghost" 
                // size="icon" 
                className="rounded-full h-8 w-8 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 text-zinc-400" />
              </button>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">Welcome back!</h1>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium italic">Continue as...</p>
            </div>
          </div>

          {/* Role Cards */}
          <div className="flex-1 space-y-4">
            {ROLES.filter(r => userRoles.includes(r.id)).map((role, index) => {
              const Icon = role.icon;
              return (
                <motion.button
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleRoleSelect(role.id)}
                  className={`w-full group relative p-5 rounded-[24px] border border-zinc-100 dark:border-zinc-800 flex items-start gap-4 text-left transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-600 hover:shadow-lg active:scale-[0.98] ${
                    selectedRole === role.id ? 'ring-2 ring-zinc-900 dark:ring-white border-transparent' : ''
                  }`}
                >
                  <div className={`p-3 rounded-2xl ${role.color} transition-transform group-hover:scale-110 duration-300`}>
                    <Icon className="h-5 w-5 text-zinc-900 dark:text-white" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider">{role.title}</h3>
                    <p className="text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-medium">{role.description}</p>
                  </div>
                  <div className="h-full flex items-center">
                    <ChevronRight className="h-4 w-4 text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-900">
            <div className="p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl space-y-2">
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed">Account Security</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                Switching roles ensures a secure and personalized experience. All data is synchronized across your account.
              </p>
            </div>
          </div>
        </div>
        
        {/* Home Indicator Mock */}
        <div className="h-6 w-full flex justify-center items-center pb-2">
          <div className="w-32 h-1 bg-zinc-900/10 dark:bg-white/10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
