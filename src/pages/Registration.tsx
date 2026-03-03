import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const registrationSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Molimo unesite Vaše ime i prezime")
      .min(2, "Ime i prezime moraju imati najmanje 2 znaka")
      .max(100, "Ime i prezime mogu imati najviše 100 znakova"),
    email: z
      .string()
      .trim()
      .email("Unesite ispravnu email adresu")
      .or(z.literal(""))
      .optional(),
    phone: z
        .string()
        .trim()
        .max(50, "Broj može imati najviše 50 znakova")
        .optional(),
      message: z
        .string()
        .trim()
        .max(500, "Poruka može imati najviše 500 znakova")
        .optional(),
    })
    .refine((data) => data.email || data.phone, {
    message: "Morate unijeti broj mobitela ili email adresu",
    path: ["phone"],
  });

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: RegistrationValues) => {
    setIsSubmitting(true);
    try {
      const payload: Record<string, string> = {
        "Ime i prezime": data.name,
        "Broj mobitela": data.phone || "Nije uneseno",
        "Napomena/Poruka": data.message || "Nema napomene",
      };

      // Ako je email unesen, šaljemo ga pod ključem 'email' da Formspree prepozna pošiljatelja
      // Ako nije unesen, šaljemo opisni ključ da izbjegnemo grešku validacije
      if (data.email) {
        payload.email = data.email;
      } else {
        payload["Email adresa"] = "Nije uneseno";
      }

      // Slanje na tvoj email (koristeći tvoj Formspree Form ID: mbdaeljg)
      const response = await fetch("https://formspree.io/f/mbdaeljg", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitted(true);
        toast.success("Prijava je uspješno poslana!");
      } else {
        const errorData = await response.json();
        console.error("Formspree odgovor:", errorData);
        toast.error("Greška pri slanju. Molimo provjerite podatke i pokušajte ponovno.");
      }
    } catch (error) {
      console.error("Mrežna greška:", error);
      toast.error("Došlo je do greške u komunikaciji s poslužiteljem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-2xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            <span>Povratak na početnu</span>
          </Link>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/10 text-secondary mb-6"
                >
                  <CheckCircle2 size={40} />
                </motion.div>
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
                  Prijava uspješna!
                </h1>
                <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
                  Hvala ti na prijavi! Uskoro ćemo te kontaktirati s dodatnim
                  informacijama o našim aktivnostima.
                </p>
                <Button asChild variant="hero" size="lg">
                  <Link to="/">Povratak na početnu</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
                  Pridruži se!
                </h1>
                <p className="text-muted-foreground text-lg mb-10">
                  Ispuni obrazac i postani dio naše zajednice mladih aktivista.
                </p>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User size={16} className="text-secondary" />
                            Ime i prezime
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Unesite ime i prezime"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Phone size={16} className="text-secondary" />
                            Broj mobitela
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Unesite broj mobitela"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Mail size={16} className="text-secondary" />
                            Email adresa
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Unesite email adresu"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <MessageSquare size={16} className="text-secondary" />
                            Dodatna napomena
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Ako nas želite nešto dodatno pitati ili napomenuti..."
                              className="resize-none min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full mt-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Slanje..." : "Pošalji prijavu"}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </div>
  );
}
