import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, User, Mail, Calendar, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const interests = [
  "Obrazovanje i stipendije",
  "Kultura i umjetnost",
  "Sport i rekreacija",
  "Ekologija i održivost",
  "Poduzetništvo",
  "Volontiranje",
  "Politika i društvo",
  "Digitalne tehnologije",
];

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ime mora imati najmanje 2 znaka")
    .max(100, "Ime može imati najviše 100 znakova"),
  email: z
    .string()
    .trim()
    .email("Unesite ispravnu email adresu")
    .max(255, "Email može imati najviše 255 znakova"),
  dateOfBirth: z
    .string()
    .nonempty("Unesite datum rođenja")
    .refine((val) => {
      const date = new Date(val);
      const now = new Date();
      const age = now.getFullYear() - date.getFullYear();
      return age >= 14 && age <= 35;
    }, "Morate imati između 14 i 35 godina"),
  interests: z
    .array(z.string())
    .min(1, "Odaberite barem jedno područje interesa"),
});

type RegistrationValues = z.infer<typeof registrationSchema>;

export default function Registration() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<RegistrationValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      interests: [],
    },
  });

  const onSubmit = (data: RegistrationValues) => {
    console.log("Registration submitted:", { ...data, email: "[redacted]" });
    setSubmitted(true);
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
                  Hvala ti na prijavi! Uskoro ćeš primiti email s dodatnim
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
                              placeholder="vasa@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Calendar size={16} className="text-secondary" />
                            Datum rođenja
                          </FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 mb-3">
                            <Heart size={16} className="text-secondary" />
                            Područja interesa
                          </FormLabel>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {interests.map((interest) => (
                              <FormField
                                key={interest}
                                control={form.control}
                                name="interests"
                                render={({ field }) => (
                                  <FormItem className="flex items-center gap-3 space-y-0 rounded-lg border border-border p-3 hover:border-secondary/50 transition-colors cursor-pointer">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          interest
                                        )}
                                        onCheckedChange={(checked) => {
                                          const updated = checked
                                            ? [...field.value, interest]
                                            : field.value?.filter(
                                                (v) => v !== interest
                                              );
                                          field.onChange(updated);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal cursor-pointer leading-tight">
                                      {interest}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full mt-4"
                    >
                      Pošalji prijavu
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
