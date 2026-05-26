---
layout:
 default
collection:
 culture
math:
 true
---

Absolutely. I went by the official course scope, the uploaded notes, and the review/history in this project, and I’m also using your later project note that fluids are not on this exam, so this list is focused on the actual midterm set:
 oscillations, waves, resonance, sound, beats, and Doppler. The official uploaded topic list is Week 1 oscillations, Week 2 driven oscillators/traveling waves/standing waves/resonance, and Week 3 beats/Doppler/fluid notes; your earlier project thread then narrowed that by removing fluids.  

I’ve made this as a self-test sheet with the answers hidden in collapsible blocks, so you can quiz yourself first and then open each section only when you want the formulas. The high-yield pattern from your notes is also very clear:
 this exam is likely to reward recognizing the governing differential equation first, then matching it to the standard form, then interpreting the parameters.  

## 1) Core “language of the exam” formulas

Try to write these from memory before opening anything:
 phase, angular frequency, period, frequency, wavelength, wavenumber, and the relation among them for oscillations and waves. These are everywhere in the notes and show up repeatedly in both oscillator and wave problems.  

<details markdown = "1">
<summary>Hidden answers</summary>

For oscillations:


[x(t)=A\cos(\omega t+\delta)]

[
\omega=\frac{2\pi}{T}=2\pi f,
\qquad
T=\frac{1}{f}
]

Meanings:


[
A=\text{amplitude},\quad
\omega t+\delta=\text{phase},\quad
\delta=\text{phase shift}
]

For traveling waves:

[
y(x,t)=A\cos(kx-\omega t+\delta)
]

[
k=\frac{2\pi}{\lambda},\qquad
\omega=2\pi f,\qquad
T=\frac1f
]

[
v=\frac{\omega}{k}=f\lambda,\qquad
\lambda=vT
]

</details>

## 2) Canonical SHO form

If they give you any physical setup and it reduces to a linear restoring force or torque, this is the first pattern you want to recognize. Your notes stress that simple harmonic motion is defined by the differential equation, not by the specific object.  

<details markdown = "1">
<summary>Hidden answers</summary>

Standard SHO equation:

[
\ddot x+\omega_0^2 x=0
]

Standard SHO solution:

[
x(t)=A\cos(\omega_0 t+\delta)
]

Velocity and acceleration:

[
v(t)=\dot x=-A\omega_0\sin(\omega_0 t+\delta)
]

[
a(t)=\ddot x=-A\omega_0^2\cos(\omega_0 t+\delta)=-\omega_0^2 x
]

Useful maxima:

[
v_{\max}=A\omega_0,\qquad
a_{\max}=A\omega_0^2
]

Period/frequency:

[
T=\frac{2\pi}{\omega_0},\qquad
f=\frac{\omega_0}{2\pi}
]

</details>

## 3) Mass-spring SHO

This is the prototype free oscillator in the notes and the one all the others get compared to.  

<details markdown = "1">
<summary>Hidden answers</summary>

Hooke’s law:

[
F_x=-kx
]

Equation of motion:

[
m\ddot x=-kx
\quad\Rightarrow\quad
\ddot x+\frac{k}{m}x=0
]

Natural angular frequency:

[
\omega_0=\sqrt{\frac{k}{m}}
]

Thus:

[
T=2\pi\sqrt{\frac{m}{k}},
\qquad
f=\frac{1}{2\pi}\sqrt{\frac{k}{m}}
]

</details>

## 4) Vertical spring / shifted equilibrium

This one matters because the physics is still SHO, but about equilibrium, not about the unstretched spring length. You kept asking about this earlier, so I’m including it explicitly. This is one of those classic traps. The oscillation frequency does not change just because gravity shifts the equilibrium point. That follows from the same SHO form after redefining displacement from equilibrium. This logic is consistent with the course’s force/energy method emphasis.  

<details markdown = "1">
<summary>Hidden answers</summary>

Static equilibrium extension:

[
k y_{\text{eq}}=mg
\quad\Rightarrow\quad
y_{\text{eq}}=\frac{mg}{k}
]

If you define displacement from equilibrium by
[
\xi=y-y_{\text{eq}},
]
then the motion is
[
\ddot \xi+\frac{k}{m}\xi=0
]

So the frequency is still
[
\omega_0=\sqrt{\frac{k}{m}}
]

General solution in physical coordinate:

[
y(t)=y_{\text{eq}}+A\cos(\omega_0 t+\delta)
]

</details>

## 5) Linear restoring torque, simple pendulum, physical pendulum

Your notes repeatedly emphasize the “compare to SHO” method. If the restoring quantity is linear in displacement or angle, read off the frequency. For pendulums, the small-angle approximation is the hinge.  

<details markdown = "1">
<summary>Hidden answers</summary>

General linear restoring torque:

[
\tau=-C\theta
]

Rotational equation:

[
I\ddot\theta=-C\theta
\quad\Rightarrow\quad
\ddot\theta+\frac{C}{I}\theta=0
]

So:

[
\omega_0=\sqrt{\frac{C}{I}}
]

### Simple pendulum

Exact torque:

[
\tau=-mgL\sin\theta
]

Equation:

[
I\ddot\theta=-mgL\sin\theta
]

For a point mass at distance (L), (I=mL^2), so
[
\ddot\theta+\frac{g}{L}\sin\theta=0
]

Small-angle approximation:

[
\sin\theta\approx\theta
]

Then:

[
\ddot\theta+\frac{g}{L}\theta=0
]

[
\omega_0=\sqrt{\frac{g}{L}},
\qquad
T=2\pi\sqrt{\frac{L}{g}}
]

### Physical pendulum

For center of mass distance (d) from pivot:

[
\tau=-mgd\sin\theta
]

Small-angle equation:

[
I\ddot\theta+mgd,\theta=0
]

[
\omega_0=\sqrt{\frac{mgd}{I}},
\qquad
T=2\pi\sqrt{\frac{I}{mgd}}
]

</details>

## 6) Taylor/small-angle approximations

These are not just math decoration; they are the tool that turns “not simple” motion into approximate SHO. The uploaded notes explicitly include Taylor expansions for this reason.  

<details markdown = "1">
<summary>Hidden answers</summary>

Near (x=0):

[
\sin x \approx x-\frac{x^3}{3!}+\cdots
]

[
\cos x \approx 1-\frac{x^2}{2}+\cdots
]

Small-angle forms used most often:

[
\sin\theta\approx\theta,
\qquad
\cos\theta\approx 1-\frac{\theta^2}{2}
]

</details>

## 7) Initial-condition formulas for free SHO

These are worth testing yourself on because even if you forget a memorized form, your notes emphasize reconstructing them from (x(0)) and (v(0)).  

<details markdown = "1">
<summary>Hidden answers</summary>

For
[
x(t)=A\cos(\omega_0 t+\delta)
]

at (t=t_0):

[
x_0=A\cos(\omega_0 t_0+\delta)
]

[
v_0=-A\omega_0\sin(\omega_0 t_0+\delta)
]

A useful amplitude formula:

[
A=\sqrt{x_0^2+\left(\frac{v_0}{\omega_0}\right)^2}
]

If (t_0=0), then one useful phase relation is
[
\tan\delta=-\frac{v_0}{\omega_0 x_0}
]

</details>

## 8) Energy in SHO

This is another favorite because it turns motion into algebra, and vice versa. 

<details markdown = "1">
<summary>Hidden answers</summary>

Spring potential energy:

[
U=\frac12 kx^2
]

Kinetic energy:

[
K=\frac12 mv^2
]

Total energy:

[
E=K+U=\frac12 kA^2=\frac12 m\omega_0^2 A^2
]

From energy:

[
\frac12 mv^2+\frac12 kx^2=\frac12 kA^2
]

So:

[
v=\pm \omega_0\sqrt{A^2-x^2}
]

</details>

## 9) Damped oscillator:
 equation, solution, classification

This is one of the biggest exam targets in your notes and in our earlier prep thread.   

<details markdown = "1">
<summary>Hidden answers</summary>

Equation of motion:

[
m\ddot x+b\dot x+kx=0
]

or
[
\ddot x+\frac{b}{m}\dot x+\frac{k}{m}x=0
]

Define
[
\omega_0=\sqrt{\frac{k}{m}},
\qquad
\beta=\frac{b}{2m}
]

Then:

[
\ddot x+2\beta \dot x+\omega_0^2 x=0
]

Underdamped solution:

[
x(t)=A_0 e^{-\beta t}\cos(\omega t+\delta)
]

with
[
\omega=\sqrt{\omega_0^2-\beta^2}
================================

\sqrt{\omega_0^2-\left(\frac{b}{2m}\right)^2}
]

Amplitude envelope:

[
A(t)=A_0 e^{-\beta t}
]

Classification:


* underdamped if (\beta<\omega_0)
* critically damped if (\beta=\omega_0)
* overdamped if (\beta>\omega_0)

Equivalent criterion in (b,m,k):

[
\left(\frac{b}{2m}\right)^2 \lessgtr \omega_0^2=\frac{k}{m}
]

Critical damping value:

[
b_c=2m\omega_0=2\sqrt{km}
]

</details>

## 10) Energy decay in damping

You asked about this before, and it is easy to mix up amplitude decay with energy decay. The notes distinguish them very clearly.  

<details markdown = "1">
<summary>Hidden answers</summary>

If
[
A(t)=A_0 e^{-\beta t},
]
then energy scales as amplitude squared:

[
E(t)\propto A(t)^2
]

So for light damping:

[
E(t)=E_0 e^{-2\beta t}
]

Also often written as
[
E(t)\approx \frac12 kA(t)^2
]

</details>

## 11) Driven oscillator:
 equation, steady-state motion, amplitude, phase, resonance

This is another very high-yield cluster because it naturally leads to “derive, identify, interpret resonance” style questions.  

<details markdown = "1">
<summary>Hidden answers</summary>

Driven damped equation:

[
m\ddot x+b\dot x+kx=F_0\cos(\omega' t+\delta')
]

or
[
\ddot x+\frac{b}{m}\dot x+\omega_0^2 x=\frac{F_0}{m}\cos(\omega' t+\delta')
]

Steady-state form:

[
x_{\text{ss}}(t)=D\cos(\omega' t+\xi)
]

Amplitude:

[
D=\frac{F_0}{\sqrt{m^2(\omega_0^2-\omega'^2)^2+(b\omega')^2}}
]

Equivalent form:

[
D=\frac{F_0/m}{\sqrt{(\omega_0^2-\omega'^2)^2+\left(\frac{b\omega'}{m}\right)^2}}
]

Phase relation:

[
\tan\xi=
-\frac{b\omega'}{m(\omega_0^2-\omega'^2)}
]

Resonant frequency for maximum amplitude:

[
\omega_{\text{res}}=\omega_0\sqrt{1-2\left(\frac{b}{2m\omega_0}\right)^2}=\sqrt{\omega_0^2-2\beta^2}
]

In the zero-damping limit:

[
\omega_{\text{res}}\to \omega_0
]

</details>

## 12) Traveling pulses and traveling waves

Your traveling-wave notes are dense and very testable:
 direction of travel, phase, and the web of relations among (v,\lambda,f,\omega,k).  

<details markdown = "1">
<summary>Hidden answers</summary>

Traveling pulse to the right:

[
f(x-vt-a_0)
]

Traveling pulse to the left:

[
f(x+vt-a_0)
]
or equivalent shifted form.

Sinusoidal traveling wave to the right:

[
y(x,t)=A\cos(kx-\omega t+\delta)
]

Sinusoidal traveling wave to the left:

[
y(x,t)=A\cos(kx+\omega t+\delta)
]

Core relations:

[
k=\frac{2\pi}{\lambda},
\qquad
\omega=2\pi f=\frac{2\pi}{T},
\qquad
v=\frac{\omega}{k}=f\lambda
]

</details>

## 13) Superposition and standing-wave construction

Standing waves are really just superposition with boundary conditions. That is exactly how your notes frame them.  

<details markdown = "1">
<summary>Hidden answers</summary>

General superposition:

[
y(x,t)=y_1(x,t)+y_2(x,t)
]

If two equal-amplitude waves travel oppositely:

[
y_1=A\cos(kx-\omega t),\qquad
y_2=A\cos(kx+\omega t)
]

Then using trig identities:

[
y(x,t)=2A\cos(kx)\cos(\omega t)
]

Equivalent sine-form versions are also possible depending on phase choice, e.g.
[
y(x,t)=2A\sin(kx)\cos(\omega t)
]

Nodes occur where the spatial factor is zero.
Antinodes occur where the spatial factor has maximum magnitude.

</details>

## 14) Wave equation and wave speeds

These are useful because they connect mathematical form to physical medium.  

<details markdown = "1">
<summary>Hidden answers</summary>

Traveling-wave equation:

[
\frac{\partial^2 f}{\partial x^2}
=================================

\frac{1}{v^2}
\frac{\partial^2 f}{\partial t^2}
]

For a stretched string:

[
v=\sqrt{\frac{T}{\mu}}
]

For sound in a solid:

[
v=\sqrt{\frac{B}{\rho_0}}
]

For sound in a gas:

[
v=\sqrt{\frac{\gamma P_0}{\rho_0}}
]

</details>

## 15) Standing waves, allowed wavelengths, allowed frequencies

This is where the exam can turn conceptual very quickly. Boundary conditions determine allowed (\lambda), which then determine (f). The sound notes and textbook agree on the open/open vs mixed-end patterns.   

<details markdown = "1">
<summary>Hidden answers</summary>

### String fixed at both ends, or any like-like boundaries (node-node or antinode-antinode)

Allowed wavelengths:

[
L=\frac{n\lambda_n}{2}
\quad\Rightarrow\quad
\lambda_n=\frac{2L}{n},
\qquad n=1,2,3,\dots
]

Allowed frequencies:

[
f_n=\frac{v}{\lambda_n}=\frac{nv}{2L}
]

Fundamental:

[
f_1=\frac{v}{2L}
]

All harmonics present:

[
n=1,2,3,\dots
]

### Mixed boundaries (node-antinode), like a closed-open pipe

Allowed wavelengths:

[
L=\frac{(2n-1)\lambda_n}{4}
\quad\Rightarrow\quad
\lambda_n=\frac{4L}{2n-1},
\qquad n=1,2,3,\dots
]

Allowed frequencies:

[
f_n=\frac{(2n-1)v}{4L}
]

Fundamental:

[
f_1=\frac{v}{4L}
]

Only odd harmonics present:

[
f=\frac{v}{4L},\ \frac{3v}{4L},\ \frac{5v}{4L},\dots
]

You may also see the index written with odd integers directly:

[
f_m=\frac{mv}{4L},\qquad m=1,3,5,\dots
]

</details>

## 16) Harmonics, overtone language, and Fourier-style pattern

Your notes make the distinction between fundamental and higher harmonics explicit. 

<details markdown = "1">
<summary>Hidden answers</summary>

Fundamental angular frequency:

[
\omega=\frac{2\pi}{T}
]

The (n)-th harmonic has frequency
[
f_n=nf_1
]
for systems with all harmonics.

For mixed-end systems, only odd harmonics appear:

[
f= f_1,\ 3f_1,\ 5f_1,\dots
]

A generic Fourier-series form:

[
y(t)=A_0+\sum_{n=1}^{\infty} A_n\cos(n\omega t)+\sum_{n=1}^{\infty} B_n\sin(n\omega t)
]

</details>

## 17) Sound wave formulas

Your sound sheet says sound is still a traveling wave, but often better written in pressure form than in displacement form.  

<details markdown = "1">
<summary>Hidden answers</summary>

Pressure form:

[
\delta p(x,t)=P_0\cos(kx-\omega t)
]

Pressure amplitude relation from your notes:

[
P_0=k\rho_0 v^2 A
]

where (A) is particle displacement amplitude.

Also useful:


* sound is longitudinal
* everything from traveling waves still applies:

  [
  v=f\lambda,\quad
  k=\frac{2\pi}{\lambda},\quad
  \omega=2\pi f
  ]

</details>

## 18) Sound intensity formulas

These came from the textbook notes as a fuller pressure/intensity bridge. Even if your class did not emphasize every version, the pressure-amplitude-to-intensity relation is very useful. 

<details markdown = "1">
<summary>Hidden answers</summary>

In terms of displacement amplitude:

[
I=\frac12,\rho B,\omega^2 A^2
]

Equivalent pressure-amplitude form:

[
I=\frac{p_{\max}^2}{2\rho v}
]

and equivalently
[
I=\frac{p_{\max}^2}{2\sqrt{\rho B}}
]

If total power (P) spreads uniformly over area (A_{\text{surf}}):

[
I=\frac{P}{A_{\text{surf}}}
]

For isotropic spreading:

[
I\propto \frac{1}{r^2}
]

</details>

## 19) Pressure nodes vs displacement nodes in standing sound waves

This is a concept trap more than a computation trap. The textbook snippet makes it explicit. 

<details markdown = "1">
<summary>Hidden answers</summary>

In standing sound waves:


* pressure node = displacement antinode
* pressure antinode = displacement node

So an open end is:


* displacement antinode
* pressure node

A closed end is:


* displacement node
* pressure antinode

</details>

## 20) Beats

This is compact, very testable, and easy to get half-right unless you remember the amplitude-envelope logic. 

<details markdown = "1">
<summary>Hidden answers</summary>

For two close frequencies (f_1) and (f_2):


Envelope-frequency idea:

[
f_{\text{amp}}=\frac{|f_1-f_2|}{2}
]

Beat frequency (loudness pulse rate):

[
f_{\text{beat}}=|f_1-f_2|
]

Beats disappear when:

[
f_1=f_2
]

</details>

## 21) Doppler effect

The sound notes gave one consistent sign convention, and that is the one you should rehearse exactly, because the conceptual difficulty is almost entirely signs.  

<details markdown = "1">
<summary>Hidden answers</summary>

General form from your notes:

[
\frac{f_{\text{heard}}}{f_{\text{emitted}}}
=
\frac{v_{\text{snd}}-v_{\text{obs}}}{v_{\text{snd}}-v_{\text{src}}}
]

with the positive direction defined from source to observer.

In that convention:


* (v_{\text{obs}}>0) if observer moves in the positive direction
* (v_{\text{src}}>0) if source moves in the positive direction

So the real skill is not memorizing isolated “toward means plus/minus” rules but staying loyal to the declared sign convention.

</details>

## 22) Shock waves / sonic boom

This is less likely to dominate a whole problem, but it is definitely in the notes. 

<details markdown = "1">
<summary>Hidden answers</summary>

If an object moves faster than sound, it creates a shock cone.

Cone-angle relation from your notes:

[
\sin\theta=\frac{v}{v_s}
]

where (v) is the sound speed in the medium and (v_s) is the object speed.

</details>

## 23) Trig identities that are especially useful for this exam

These are not “physics formulas” in the narrow sense, but your uploaded trig sheet is very relevant because they help you turn superpositions into standing waves and beats. 

<details markdown = "1">
<summary>Hidden answers</summary>

Core addition identities:

[
\sin(A+B)=\sin A\cos B+\cos A\sin B
]

[
\sin(A-B)=\sin A\cos B-\cos A\sin B
]

[
\cos(A+B)=\cos A\cos B-\sin A\sin B
]

[
\cos(A-B)=\cos A\cos B+\sin A\sin B
]

Especially useful recombinations:

[
p\cos A+q\sin A=r\cos(A-\phi),\qquad
r=\sqrt{p^2+q^2},\quad \tan\phi=\frac{q}{p}
]

and similarly
[
p\cos A+q\sin A=r\sin(A+\theta),\qquad
r=\sqrt{p^2+q^2},\quad \tan\theta=\frac{p}{q}
]

</details>

## 24) Derivation triggers you should be able to recognize on sight

This is the non-formula part that still belongs on the self-test, because your project history kept emphasizing it.  

<details markdown = "1">
<summary>Hidden answers</summary>

If you see a force or torque proportional to displacement:

[
F=-kx
\quad\text{or}\quad
\tau=-C\theta
]
think SHO immediately.

If you see (\sin\theta) in a pendulum:

think “small-angle approximation” to reduce it to SHO.

If you see drag proportional to velocity:

[
F_d=-bv
]
think damping.

If you see an external sinusoidal force:

[
F_{\text{drive}}=F_0\cos(\omega' t+\delta')
]
think driven oscillator and steady-state response.

If you see (kx-\omega t):

right-moving wave.

If you see (kx+\omega t):

left-moving wave.

If you see two opposite-traveling waves of same (A,k,\omega):

think standing wave.

If you see node-node or antinode-antinode boundaries:

all harmonics.

If you see mixed boundaries:

odd harmonics only.

</details>

## 25) Minimal “must know cold” set

If you want the brutally compressed memory list, this is it. It is basically the same priority pattern that came out of the earlier midterm review notes.  

<details markdown = "1">
<summary>Hidden answers</summary>

[
\ddot x+\omega_0^2x=0,\qquad x=A\cos(\omega_0 t+\delta)
]

[
\omega_0=\sqrt{\frac{k}{m}},\qquad
\omega_0=\sqrt{\frac{g}{L}},\qquad
\omega_0=\sqrt{\frac{mgd}{I}}
]

[
\ddot x+\frac{b}{m}\dot x+\frac{k}{m}x=0,
\qquad
\beta=\frac{b}{2m},
\qquad
\omega=\sqrt{\omega_0^2-\beta^2}
]

[
x_{\text{damped}}=A_0 e^{-\beta t}\cos(\omega t+\delta),
\qquad
E(t)\propto e^{-2\beta t}
]

[
m\ddot x+b\dot x+kx=F_0\cos(\omega't+\delta')
]

[
D=
\frac{F_0}{\sqrt{m^2(\omega_0^2-\omega'^2)^2+(b\omega')^2}}
]

[
\tan\xi=
-\frac{b\omega'}{m(\omega_0^2-\omega'^2)}
]

[
\omega_{\text{res}}=\sqrt{\omega_0^2-2\beta^2}
]

[
y(x,t)=A\cos(kx-\omega t+\delta),
\qquad
k=\frac{2\pi}{\lambda},
\quad
\omega=2\pi f,
\quad
v=\frac{\omega}{k}=f\lambda
]

[
f_n=\frac{nv}{2L}
\quad\text{(like-like boundaries)}
]

[
f_n=\frac{(2n-1)v}{4L}
\quad\text{(mixed boundaries)}
]

[
\delta p=P_0\cos(kx-\omega t),
\qquad
f_{\text{beat}}=|f_1-f_2|
]

[
\frac{f_{\text{heard}}}{f_{\text{emitted}}}
=\frac{v_{\text{snd}}-v_{\text{obs}}}{v_{\text{snd}}-v_{\text{src}}}
]

</details>

If you want, the next best step is for me to turn this into a one-page “blank recall quiz” version where I remove the formulas entirely and leave only the prompts.
