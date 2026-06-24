import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Upload } from 'lucide-react';
import { CATEGORIES } from '../data';

export default function SellModal({ isOpen, onClose, onCreateListing }) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Wohnmobile & Camper');
  const [newPrice, setNewPrice] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newFeatures, setNewFeatures] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formStep === 1) {
      setFormStep(2);
      return;
    }

    const newListing = {
      id: `lst_custom_${Date.now()}`,
      title: newTitle || 'Custom Premium Caravan',
      category: newCategory,
      price: Number(newPrice) || 45000,
      pricePeriod: 'Kaufpreis',
      location: newLocation || 'Hamburg, Deutschland',
      rating: 5.0,
      reviewsCount: 1,
      images: ['https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&w=800&q=80'],
      seller: {
        name: 'Ihr Inserat (Privat)',
        verified: true,
        type: 'Privat'
      },
      features: newFeatures.split(',').map((f) => f.trim()).filter(Boolean),
      isExclusive: false
    };

    onCreateListing(newListing);
    setFormSuccess(true);
    
    setTimeout(() => {
      onClose();
      // Reset form states after closing animation completes
      setTimeout(() => {
        setFormSuccess(false);
        setFormStep(1);
        setNewTitle('');
        setNewPrice('');
        setNewLocation('');
        setNewFeatures('');
        setNewDescription('');
      }, 500);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-forest/80 backdrop-blur-md"
          />

          {/* Modal Body */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-sand w-full max-w-xl rounded-[32px] shadow-2xl overflow-hidden z-10 p-8 md:p-10 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-forest text-white hover:bg-gold hover:text-forest flex items-center justify-center transition-all shadow-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {formSuccess ? (
              <div className="py-12 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <h3 className="font-display text-2xl font-bold text-forest">
                  Inserat erfolgreich geschaltet!
                </h3>
                <p className="text-sm text-charcoal/70 max-w-sm mx-auto leading-relaxed">
                  Vielen Dank. Ihr Camping-Inserat ist ab sofort live auf der Plattform sichtbar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step counter */}
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-full bg-forest text-gold flex items-center justify-center font-mono text-xs font-bold">
                    {formStep}
                  </span>
                  <span className="font-mono text-xs font-bold text-gold uppercase tracking-widest">
                    Schritt {formStep} von 2: {formStep === 1 ? 'Basisdaten' : 'Ausstattung'}
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-forest">
                  {formStep === 1 ? 'Was möchten Sie inserieren?' : 'Fügen Sie Details hinzu'}
                </h3>

                {formStep === 1 ? (
                  <div className="space-y-4">
                    {/* Title */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                        Titel des Inserats *
                      </label>
                      <input
                        type="text"
                        required
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Z.B. Hymer B-Klasse MasterLine"
                        className="w-full bg-white border border-forest/10 p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Dropdown Category */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                        Kategorie *
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-white border border-forest/10 p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold cursor-pointer"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Price */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                          Preis (in €) *
                        </label>
                        <input
                          type="number"
                          required
                          value={newPrice}
                          onChange={(e) => setNewPrice(e.target.value)}
                          placeholder="Z.B. 89000"
                          className="w-full bg-white border border-forest/10 p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold"
                        />
                      </div>

                      {/* Location */}
                      <div className="space-y-1">
                        <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                          Standort (Ort) *
                        </label>
                        <input
                          type="text"
                          required
                          value={newLocation}
                          onChange={(e) => setNewLocation(e.target.value)}
                          placeholder="Z.B. Hamburg"
                          className="w-full bg-white border border-forest/10 p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Description */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                        Beschreibung
                      </label>
                      <textarea
                        rows={3}
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        placeholder="Teilen Sie wichtige Merkmale mit künftigen Käufern..."
                        className="w-full bg-white border border-forest/10 p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Features */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                        Ausstattungsmerkmale (kommagetrennt)
                      </label>
                      <input
                        type="text"
                        value={newFeatures}
                        onChange={(e) => setNewFeatures(e.target.value)}
                        placeholder="Z.B. Solar-Zelle, Lederpolster, Allrad, Klimaanlage"
                        className="w-full bg-white border border-forest/10 p-3.5 rounded-xl text-sm focus:outline-none focus:border-gold"
                      />
                    </div>

                    {/* Upload mockup */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-forest/70">
                        Premium Bilder hochladen
                      </label>
                      <div className="border border-dashed border-forest/20 rounded-2xl p-6 bg-white/50 text-center flex flex-col items-center justify-center cursor-pointer hover:bg-white transition-all">
                        <Upload className="w-8 h-8 text-gold mb-2" />
                        <p className="text-xs font-semibold text-forest">Bilder hierher ziehen oder durchsuchen</p>
                        <p className="text-[10px] text-charcoal/40 mt-1">Unterstützt JPG, PNG, WEBP (Maximal 10MB)</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Buttons */}
                <div className="pt-4 border-t border-forest/10 flex items-center justify-between gap-4">
                  {formStep === 2 && (
                    <button
                      type="button"
                      onClick={() => setFormStep(1)}
                      className="bg-transparent text-forest border border-forest/10 hover:border-forest/35 py-3.5 px-6 rounded-full font-sans text-xs font-semibold uppercase tracking-wider"
                    >
                      Zurück
                    </button>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-forest text-sand hover:bg-gold hover:text-forest py-3.5 px-6 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md text-center"
                  >
                    {formStep === 1 ? 'Weiter zu Schritt 2' : 'Inserat live schalten'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
