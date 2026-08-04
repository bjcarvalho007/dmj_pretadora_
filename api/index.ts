import express from "express";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(express.json());

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

app.post("/api/quote", async (req, res) => {
  try {
    const { name, phone, city, serviceType, serviceTitle, description, quoteLanguage } = req.body;

    const langNames: Record<string, string> = {
      fr: "Français",
      pt: "Português (Brasil)",
      pt_PT: "Português (Portugal)",
      en: "English",
      es: "Español",
      it: "Italiano",
      de: "Deutsch"
    };

    const targetLang = langNames[quoteLanguage] || "Français";

    const systemPrompt = `Vous êtes l'Assistant IA officiel de DMJ PRESTATAIRE DE SERVICES (Spécialiste en Jardinage, Peinture, Électricité, et Nettoyage de Vitres).
Générez une proposition commerciale et technique de haut niveau, courtoise et ultra-professionnelle.
Vous DEVEZ répondre STRICTEMENT en format JSON valide avec la structure exacte suivante (ne mettez aucun texte en dehors du JSON) :
{
  "greeting": "Salutation courtoise et personnalisée pour le client",
  "serviceSummary": "Résumé concis de la prestation demandée",
  "technicalScope": "Description technique détaillée des étapes de réalisation, de la méthodologie et du savoir-faire DMJ",
  "materialsNeeded": ["Liste des équipements professionnels et matériaux recommandés"],
  "estimatedDays": "Durée d'intervention estimée (ex: 1 à 2 jours ouvrés)",
  "estimatedPriceRange": "Fourchette d'estimation de prix HT/TTC en Euros (€) réaliste et détaillée",
  "guarantees": "Engagements de qualité, propreté du chantier après travaux et garantie de satisfaction DMJ",
  "terms": "Modalités d'intervention (Devis gratuit, sans engagement, validation sur rdv)",
  "finalMessage": "Message de conclusion chaleureux incitant à valider la demande via WhatsApp"
}`;

    const userPrompt = `Rédigez la proposition commerciale entièrement dans la langue : ${targetLang}.
Informations de la demande :
- Nom du client: ${name || "Client DMJ"}
- Téléphone: ${phone || "Non renseigné"}
- Ville / Zone: ${city || "Île-de-France"}
- Catégorie de service: ${serviceTitle || serviceType}
- Description & besoins spécifiés par le client: ${description || "Rénovation et entretien sur mesure."}`;

    if (!ai) {
      return res.json({
        greeting: `Bonjour ${name || 'cher client'},`,
        serviceSummary: `Prestation : ${serviceTitle || serviceType}`,
        technicalScope: description ? `Analyse détaillée de votre besoin : "${description}". Inspection préalable sur site pour valider le calepinage et les contraintes techniques.` : "Analyse technique approfondie lors de la première inspection sur site.",
        materialsNeeded: ["Matériel professionnel DMJ", "Outillage spécifique sécurisé", "Produits de finition haute résistance"],
        estimatedDays: "1 à 2 jours selon la surface",
        estimatedPriceRange: "180€ - 450€ HT (estimation indicative à confirmer sur site)",
        guarantees: "Chantier laissé propre et ordonné, garantie satisfaction 100% et respect des délais.",
        terms: "Devis 100% gratuit, sans engagement de votre part.",
        finalMessage: "Merci d'avoir choisi DMJ Prestataire de Services ! Cliquez sur 'Valider ce Devis sur WhatsApp' pour bloquer votre créneau."
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json"
      }
    });

    const rawText = response.text || "";
    try {
      const parsed = JSON.parse(rawText);
      return res.json(parsed);
    } catch {
      return res.json({
        greeting: `Bonjour ${name || 'cher client'},`,
        serviceSummary: `Prestation : ${serviceTitle || serviceType}`,
        technicalScope: rawText || "Analyse technique réalisée par l'équipe DMJ.",
        materialsNeeded: ["Équipements spécialisés DMJ"],
        estimatedDays: "1 à 2 jours",
        estimatedPriceRange: "Sur devis personnalisé (150€ - 400€)",
        guarantees: "Garantie de qualité et de propreté sur tous nos chantiers.",
        terms: "Devis sans engagement",
        finalMessage: "Nous restons à votre disposition pour planifier votre intervention."
      });
    }
  } catch (error: any) {
    console.error("Error generating quote with Gemini:", error);
    res.status(500).json({
      error: "Erreur lors de la génération du devis.",
      details: error.message
    });
  }
});

export default app;
